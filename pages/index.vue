<template>
  <div>
    <h1>Главная</h1>
    <p>Вы залогинены с Vue.js & JWT!!</p>
    <p>Ваша роль: <strong>{{ currentUser.role }}</strong>.</p>
    <p>Эта страница доступна всем аутентифицированным пользователям.</p>
    <div>
        Текущий пользователь защиoщенной конечной точки api:
        <ul v-if="userFromApi">
            <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
        </ul>
    </div>
</div>
</template>

<script>
import { authenticationService } from '~/_services/authentication.service';
import { userService } from '~/_services/user.service';

export default {
    data() {
        return {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    },
    created() {
        if (!this.currentUser) this.$router.push("/login");
        userService
            .getById(this.currentUser.id)
            .then(user => (this.userFromApi = user));
    }
};
</script>

<style>

</style>