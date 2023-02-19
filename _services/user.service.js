import { requestOptions } from "~/_helpers/request-options";
import { handleResponse } from "~/_helpers/handle-response";

export const userService = {
  getAll,
  getById
};
// получение всех пользователей
function getAll() {
  return fetch(`/users`, requestOptions.get()).then(handleResponse);
}
// получение пользователя по id
function getById(id) {
  return fetch(`/users/${id}`, requestOptions.get()).then(handleResponse);
}
