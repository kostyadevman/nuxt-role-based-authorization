<template>
  <div>
    <Navbar />
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
          >Vue.js - Role Based Authorization Tutorial & Example</a
        >
      </p>
      <p>
        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
      </p>
    </div>
  </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar'
  export default {
    components: {
      Navbar
    }
  }
  </script>
  
  
  <style>
  </style>