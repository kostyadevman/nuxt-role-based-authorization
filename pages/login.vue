<template>
   <div>
    <div class="alert alert-info">
      <strong>Обычный пользователь</strong> - U: user P: user
      <br>
      <strong>Администратор</strong> - U: admin P: admin
    </div>
    <h2>Форма входа</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Логин</label>
        <input
          type="text"
          v-model.trim="$v.username.$model"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
        >
        <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          v-model.trim="$v.password.$model"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.password.$error }"
        >
        <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span class="spinner-border spinner-border-sm" v-show="loading"></span>
          <span>Войти</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </form>
  </div> 
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { authenticationService } from "~/_services/authentication.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  created() {
    console.log(`app`, this.$app)
    // перенаправляем на главную страницу, если пользователь залогинен
    if (authenticationService.currentUserValue) {
      return this.$router.push("/");
    }

    // получить обратный адрес из параметров маршрута или по умолчанию "/"
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      // проходим валидацию логина и пароля
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      authenticationService.login(this.username, this.password).then(
        user => this.$router.push(this.returnUrl),
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>

<style>

</style>