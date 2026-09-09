import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const cmsPackages = process.env.CMS_PACKAGES_DIR
  ? resolve(process.env.CMS_PACKAGES_DIR)
  : fileURLToPath(new URL('../../projects/cms/packages/', import.meta.url))

const cmsPackage = (name: string, entry: string) => {
  const file = resolve(cmsPackages, name, entry)
  if (!existsSync(file)) {
    throw new Error(
      `The CMS package "${name}" has no build output at ${file}. ` +
        'Run "pnpm install && pnpm build" in the CMS checkout, or point CMS_PACKAGES_DIR at its packages directory.',
    )
  }
  return file
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-09',
  devtools: { enabled: true },
  modules: [
    cmsPackage('adapter-vue', 'dist/nuxt/module.js'),
    '@nuxt/eslint',
    'nuxt-shiki',
    'nuxt-svgo',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
  alias: {
    '@cms/adapter-vue': cmsPackage('adapter-vue', 'dist/index.js'),
    '@cms/content-model': cmsPackage('content-model', 'dist/index.js'),
  },
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
    resolve: {
      dedupe: ['vue'],
    },
    server: {
      fs: {
        allow: [resolve(cmsPackages, '..')],
      },
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
