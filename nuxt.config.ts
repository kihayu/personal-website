import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-shiki'],
  css: ['~/assets/css/main.css'],
  shiki: {
    defaultTheme: 'dracula',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
