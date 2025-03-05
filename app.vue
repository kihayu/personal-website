<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Keanu Hie · Portfolio',
  url: 'https://www.keanuhie.com/',
}

useHead({
  script: [
    {
      hid: 'breadcrumbs-json-ld',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
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
