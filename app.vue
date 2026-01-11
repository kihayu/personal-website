<template>
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  description:
    'Fullstack developer creating modern web apps with Vue.js, TypeScript & Python. Specializing in accessible, attractive UIs and scalable solutions.',
  ogImage: 'https://www.keanuhie.com/images/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://www.keanuhie.com/images/og-image.png',
  keywords:
    'Fullstack Developer, Frontend Development, Backend Development, Vue.js, TypeScript, Node.js, Python, UI/UX Design, Figma, Web Accessibility, DevOps, Git, Linux, Vercel, Netlify, Bun, Game Development, LLM, AI, Vienna',
})

useSchemaOrg([
  {
    '@type': 'Person',
    name: 'Keanu Hie',
    url: 'https://www.keanuhie.com',
    image: 'https://www.keanuhie.com/images/profile-photo-1724.jpg',
    jobTitle: 'Fullstack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'ÖAMTC',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vienna',
      addressCountry: 'AT',
    },
    sameAs: [
      'https://github.com/kihayu',
      'https://linkedin.com/in/keanu-hie/',
    ],
  },
  {
    '@type': 'WebSite',
    name: 'Keanu Hie · Developer Portfolio',
    url: 'https://www.keanuhie.com',
    description:
      'Fullstack developer creating modern web apps with Vue.js, TypeScript & Python. Specializing in accessible, attractive UIs and scalable solutions.',
  },
])
</script>

<style>
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-from,
.layout-leave-to {
  transition: all 1000ms ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
