<template>
    <div>
    <h1>Панель администратора</h1>
    <p>Эта страница доступна только администраторам.</p>
    <div>
      Все пользователи (только для администраторов) конечной точки api:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authenticationService } from "~/_services/authentication.service";
import { userService } from "~/_services/user.service";

export default {
  data() {
    return {
      user: authenticationService.currentUserValue,
      users: []
    };
  },
  created() {
    userService.getAll().then(users => (this.users = users));
  }
};
</script>
