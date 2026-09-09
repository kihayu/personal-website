import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-09',
  devtools: { enabled: true },
  modules: ['@cms/adapter-vue/nuxt', '@nuxt/eslint', 'nuxt-shiki', 'nuxt-svgo', '@nuxtjs/seo', '@nuxt/image'],
  cms: {
    siteId: 'keanuhie',
    frontendId: 'personal-website',
    source: process.env.CMS_SOURCE === 'snapshot' ? 'snapshot' : 'api',
    locales: ['en'],
    defaultLocale: 'en',
    localePrefix: 'never',
    blocksDir: 'blocks',
    templatesDir: 'templates',
    notFoundPath: '/404',
    delivery: {
      defaultMode: 'on-demand',
      revalidateSeconds: 300,
    },
    pushManifest: process.env.CMS_PUSH_MANIFEST === 'true',
  },
  experimental: {
    payloadExtraction: false,
  },
  site: {
    url: 'https://www.keanuhie.com',
    name: 'Keanu Hie · Developer Portfolio',
    description:
      'Fullstack developer creating modern web apps with Vue.js, TypeScript & Python. Specializing in accessible, attractive UIs and scalable solutions.',
    defaultLocale: 'en',
  },
  ogImage: { enabled: false },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
    '~/assets/fonts/satoshi/css/satoshi.css',
    '~/assets/fonts/erode/css/erode.css',
  ],
  shiki: {
    defaultTheme: 'dracula',
    bundledLangs: ['typescript', 'javascript', 'vue', 'python', 'bash', 'json'],
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
  hooks: {
    'vite:extendConfig'(config, { isClient }) {
      if (!isClient) {
        return
      }
      Object.assign(config.resolve?.alias ?? {}, {
        '@cms/content-model': fileURLToPath(new URL('node_modules/@cms/content-model/dist/index.js', import.meta.url)),
      })
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      titleTemplate: '%s',
      bodyAttrs: {
        class: 'font-primary box-border bg-stone-900 text-white lg:px-16 xl:px-32',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page' },
    layoutTransition: { name: 'layout' },
  },
})
