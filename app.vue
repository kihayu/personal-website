<template>
  <NuxtPage />
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
