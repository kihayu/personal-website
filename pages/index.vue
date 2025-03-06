<template>
  <div class="flex w-full flex-col items-center justify-center gap-y-4">
    <MainSection class="mx-4 max-w-[1280px] pt-4 lg:min-h-screen lg:pt-12 2xl:pt-16" />
    <ProjectSection class="mx-4 min-h-screen max-w-[1280px]" />
  </div>
</template>

<script setup lang="ts">
import MainSection from '~/components/section/sections/MainSection.vue'
import ProjectSection from '~/components/section/sections/ProjectSection.vue'
</script>
