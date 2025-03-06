<template>
  <!-- Root container needed! -->
  <div>
    <MainSection class="mx-4 max-w-[1280px] lg:min-h-screen" />
    <ProjectSection class="mx-4 min-h-screen max-w-[1280px]" />
  </div>
</template>

<script setup lang="ts">
import MainSection from '~/components/section/sections/MainSection.vue'
import ProjectSection from '~/components/section/sections/ProjectSection.vue'
</script>
