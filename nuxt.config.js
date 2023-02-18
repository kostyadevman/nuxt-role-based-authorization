export default {
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "Nuxt.js starter for CSB",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox"
      }
    ],
    link: [
      { 
        rel: "icon", 
        type: "image/x-icon", 
        href: "/favicon.ico" 
      }
    ],
    link: [
      { 
        rel: "stylesheet",
        href: "//netdna.bootstrapcdn.com/bootstrap/4.2.0/css/bootstrap.min.css" 
      }
    ],
  },
  ssr: false,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  /*
   ** Nuxt.js modules
   ** Doc: https://modules.nuxtjs.org
   */
  modules: [],

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/docs/2.x/directory-structure/plugins
   */
  plugins: [
    {src: '~/plugins/vuelidate.js'},
    {src: '~/plugins/backend.js'},
    {src: '~/plugins/app-router.js'}
  ],
};