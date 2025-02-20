import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-shiki', 'nuxt-svgo'],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
    '~/assets/fonts/satoshi/css/satoshi.css',
    '~/assets/fonts/erode/css/erode.css',
  ],
  shiki: {
    defaultTheme: 'dracula',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  svgo: {
    svgo: false,
    defaultImport: 'component',
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'font-primary box-border bg-stone-900 text-white lg:px-32',
      },
    },
  },
})
