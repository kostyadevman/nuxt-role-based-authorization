<template>
  <div>
    <h1>Home</h1>
    <p>You're logged in with Vue.js & JWT!!</p>
    <p>Your role is: <strong>{{ currentUser.role }}</strong>.</p>
    <p>This page can be accessed by all authenticated users.</p>
    <div>
        Current user from secure api end point:
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