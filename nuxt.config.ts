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
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      bodyAttrs: {
        class: 'font-primary box-border bg-stone-900 text-white lg:px-16 xl:px-32',
      },
      title: 'Keanu Hie - Frontend & Backend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Portfolio of Keanu Hie - Frontend & Backend Developer' },
        {
          name: 'keywords',
          content: 'Frontend Developer, Backend Developer, Web Development, Vue.js, Nuxt, UI/UX, Vienna',
        },
        { property: 'og:title', content: 'Keanu Hie - Frontend & Backend Developer' },
        { property: 'og:description', content: 'Portfolio of Keanu Hie - Frontend & Backend Developer' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Keanu Hie - Frontend & Backend Developer' },
        { name: 'twitter:description', content: 'Portfolio of Keanu Hie - Frontend & Backend Developer' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
