import { authenticationService } from "~/_services/authentication.service";

/**
 * опции запросов
 * название функции отражает смысл метода
 * get() - method: "GET"
 * и к каждому запросу прикрепляем заголовки
 */
export const requestOptions = {
  get() {
    return {
      method: "GET",
      ...headers()
    };
  },
  post(body) {
    return {
      method: "POST",
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  patch(body) {
    return {
      method: "PATCH",
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  put(body) {
    return {
      method: "PUT",
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  delete() {
    return {
      method: "DELETE",
      ...headers()
    };
  }
};

// к заголовкам добавляем заголовок авторизации с токеном
function headers() {
  const currentUser = authenticationService.currentUserValue || {};
  const authHeader = currentUser.token
    ? { Authorization: "Bearer " + currentUser.token }
    : {};
  return {
    headers: {
      ...authHeader,
      "Content-Type": "application/json"
    }
  };
}
