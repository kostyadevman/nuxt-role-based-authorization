<template>
  <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <nuxt-link to="/" class="nav-item nav-link">Home</nuxt-link>
      <nuxt-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</nuxt-link>
      <a @click="logout" class="nav-item nav-link">Logout</a>
    </div>
  </nav>
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
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  },
  methods: {
    logout() {
      authenticationService.logout();
      this.$router.push("/login");
    }
  }
};
</script>
