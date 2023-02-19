<template>
  <div>
  <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <nuxt-link exact to="/" class="nav-item nav-link">Главная</nuxt-link>
      <nuxt-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Панель администратора</nuxt-link>
      <a @click="logout"  class="nav-item nav-link">Выйти</a>
    </div>
  </nav>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <nuxt />
          </div>
        </div>  
      </div>
    </div>
    <div class="text-center">
      <p>
        <a
          href="http://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example"
          target="_top"
          >Nuxt.js - Пример и руководство авторизации пользователей на основе ролей</a
        >
      </p>
      <p>
        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
      </p>
    </div>
  </div>
  </template>
  
  <script>
import { authenticationService } from "~/_services/authentication.service";
import { Role } from "~/_helpers/role";

export default {
  data() {
    return {
      currentUser: null
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
  },
  created() {
    // подписываемся на объект пользователя
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  },
  methods: {
    // выходим из аккаунта и переход на страницу логина
    logout() {
      authenticationService.logout();
      this.$router.push("/login");
    }
  }
};
  </script>
  
  
<style scoped>
a {
  cursor: pointer;
}
</style>