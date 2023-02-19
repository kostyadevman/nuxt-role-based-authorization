import { authenticationService } from "~/_services/authentication.service";

export default function({route, redirect}) {
  // получаем метаданные о необходимости авторизации 
  const { authorize } = route.meta[0];
  // получаем текущего пользователя
  const currentUser = authenticationService.currentUserValue;

  
  if (authorize) {
    // пользователь не залогинен - отправляем логиниться
    if (!currentUser) {
      redirect('/login')
    }

    // если роль не совпадает - отправляем на главную страницу
    if (authorize.length && !authorize.includes(currentUser.role)) {
      redirect('/')
    }
  }
}