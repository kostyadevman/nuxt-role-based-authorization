import { Role } from "./role";

// конфиг бекенда
export function configureFakeBackend() {
  // массив существующих юзеров
  let users = [
    {
      id: 1,
      username: "admin",
      password: "admin",
      firstName: "Admin",
      lastName: "User",
      role: Role.Admin
    },
    {
      id: 2,
      username: "user",
      password: "user",
      firstName: "Normal",
      lastName: "User",
      role: Role.User
    }
  ];
  // присваиваем fetch из webapi в переменную
  let realFetch = window.fetch;
  // переопределяем метод fetch
  window.fetch = function(url, opts) {
    // забираем заголовок authorization
    const authHeader = opts.headers["Authorization"];
    // проверяем залогинен ли пользователь
    const isLoggedIn =
      authHeader && authHeader.startsWith("Bearer fake-jwt-token");
    const roleString = isLoggedIn && authHeader.split(".")[1];
    // присваиваем роль пользователю, если она есть
    const role = roleString ? Role[roleString] : null;
    return new Promise((resolve, reject) => {
      // оборачиваем в timeout для имитации вызова api сервера
      setTimeout(() => {
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // парсим тело запроса
          const params = JSON.parse(opts.body);
          const user = users.find(
            x =>
              x.username === params.username && x.password === params.password
          );
          // если имя пользователя не совпадает с паролем выкидываем ошибку, иначе выкидываем ok()
          if (!user) return error("Username or password is incorrect");
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: `fake-jwt-token.${user.role}`
          });
        }
        // получаем пользователя по id - админ или пользователь 
        //( пользователь может получить собственную запись)
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          if (!isLoggedIn) return unauthorised();

          let urlParts = url.split("/");
          let id = parseInt(urlParts[urlParts.length - 1]);

          const currentUser = users.find(x => x.role === role);
          if (id !== currentUser.id && role !== Role.Admin)
            return unauthorised();

          const user = users.find(x => x.id === id);
          return ok(user);
        }

        // получаем всех пользователей - только админ
        if (url.endsWith("/users") && opts.method === "GET") {
          if (role !== Role.Admin) return unauthorised();
          return ok(users);
        }

        // передаем любые запросы, не рассмотренные выше
        realFetch(url, opts).then(response => resolve(response));

        // удачный ответ сервера
        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body))
          });
        }
        // серверный отказ
        function unauthorised() {
          resolve({
            status: 401,
            text: () =>
              Promise.resolve(JSON.stringify({ message: "Unauthorised" }))
          });
        }
        // серверная ошибка
        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message }))
          });
        }
      }, 500);
    });
  };
}
