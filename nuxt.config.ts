import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-shiki', 'nuxt-svgo', '@pinia/nuxt', '@nuxtjs/seo', '@nuxt/image', 'nuxt-og-image', 'nuxt-schema-org'],
  site: {
    url: 'https://www.keanuhie.com',
    name: 'Keanu Hie · Developer Portfolio',
    description:
      'Fullstack developer creating modern web apps with Vue.js, TypeScript & Python. Specializing in accessible, attractive UIs and scalable solutions.',
    defaultLocale: 'en',
  },
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
    build: {
      sourcemap: false,
    },
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
      bodyAttrs: {
        class: 'font-primary box-border bg-stone-900 text-white lg:px-16 xl:px-32',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page' },
    layoutTransition: { name: 'layout' },
  },
})