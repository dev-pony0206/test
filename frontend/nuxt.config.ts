export default defineNuxtConfig({
  vue: {
      compilerOptions: {
          directiveTransforms: {
              motion: () => ({
                  props: [],
                  needRuntime: true
              })
          }
      }
  }, 

  runtimeConfig: {
      public: {
        apiBase: 'NUXT_PUBLIC_API_BASE'
      }
    },

  css: [
      "@/assets/css/input.css"
  ],

  tailwindcss: {
      configPath: './tailwind.config.js',
  },

  modules: [ 
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
  ],

  devtools: {
      enabled: true 
  }
});
