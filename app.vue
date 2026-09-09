<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  ogImage: 'https://www.keanuhie.com/images/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://www.keanuhie.com/images/og-image.png',
})

// Unhead v3 dropped `keywords` from useSeoMeta's input type; it still renders
// via the generic meta array.
useHead({
  meta: [
    {
      name: 'keywords',
      content:
        'Fullstack Developer, Frontend Development, Backend Development, Vue.js, TypeScript, Node.js, Python, UI/UX Design, Figma, Web Accessibility, DevOps, Git, Linux, Vercel, Netlify, Bun, Game Development, LLM, AI, Vienna',
    },
  ],
})
</script>

<style>
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
