<template>
      <div>
        <h1>Home</h1>
        <p>You're logged in with Vue.js & JWT!!</p>
        <!-- <p>Your role is: <strong>{{ currentUser.role }}</strong>.</p> -->
        <p>This page can be accessed by all authenticated users.</p>
        <div>
            Current user from secure api end point:
            <!-- <ul v-if="userFromApi">
                <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
            </ul> -->
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>