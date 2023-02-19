import { BehaviorSubject } from "rxjs";

import { requestOptions } from "~/_helpers/request-options";
import { handleResponse } from "~/_helpers/handle-response";

// кладем в currentUserSubject состояние из localStorage currentUser
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

// экспорт объекта для аутентификации с методами и наблюдаемым объектом currentUser
export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

// функция входа, осуществляемая через пост запрос
// и при положительном ответе запись пользователя в localstorage
function login(username, password) {
  return fetch(
    `/users/authenticate`,
    requestOptions.post({ username, password })
  )
    .then(handleResponse)
    .then(user => {
      // хранить сведения о пользователе и токен в локальном хранилище,
      // чтобы держать пользователя в журнале между обновлениями страниц
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

// функция выхода, удаление записи из localstorage
// присваивание состояния пользователя в null
function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
