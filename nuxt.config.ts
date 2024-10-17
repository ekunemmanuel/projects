// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxt/fonts"],
  compatibilityDate: "2024-10-15",
  fonts: {
    families: [
      { name: 'Grandstander', provider: 'google' },
    ]
  },
  tailwindcss: {
    config: {
      theme: {
        fontFamily: {
          'sans': ['Grandstander', 'sans-serif'],
        },
        extend: {
          colors: {
            contessa: {
              '50': '#fbf6f5',
              '100': '#f6ecea',
              '200': '#f0dcd8',
              '300': '#e4c3bd',
              '400': '#d3a096',
              '500': '#ba7264',
              '600': '#aa6558',
              '700': '#8e5347',
              '800': '#77463d',
              '900': '#643f38',
              '950': '#351e1a',
            },
          },
        }
      }
    }
  }
})