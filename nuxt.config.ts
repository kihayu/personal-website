import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-shiki', 'nuxt-svgo', '@pinia/nuxt'],
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
      title: 'Keanu Hie · Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content:
            'Fullstack developer crafting modern web experiences with Vue.js, TypeScript, and Python. Focused on accessible design, good looking user interface, and scalable solutions.',
        },
        {
          name: 'keywords',
          content:
            'Fullstack Developer, Frontend Development, Backend Development, Vue.js, TypeScript, Node.js, Python, UI/UX Design, Figma, Web Accessibility, DevOps, Git, Linux, Vercel, Netlify, Bun, Game Development, LLM, AI, Vienna',
        },
        { property: 'og:title', content: 'Keanu Hie · Developer Portfolio' },
        { property: 'og:site_name', content: 'Keanu Hie · Developer Portfolio' },
        {
          property: 'og:description',
          content:
            'Fullstack developer crafting modern web experiences with Vue.js, TypeScript, and Python. Focused on accessible design, good looking user interface, and scalable solutions.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://www.keanuhie.com/images/og-image.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'A cover photo of Keanu Hie with the text "Turning Code into Compelling User Experiences"',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Keanu Hie · Developer Portfolio' },
        {
          name: 'twitter:description',
          content:
            'Fullstack developer crafting modern web experiences with Vue.js, TypeScript, and Python. Focused on accessible design, good looking user interface, and scalable solutions.',
        },
        { name: 'twitter:image', content: 'https://www.keanuhie.com/images/og-image.png' },
        {
          name: 'twitter:image:alt',
          content: 'A cover photo of Keanu Hie with the text "Turning Code into Compelling User Experiences"',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
})
