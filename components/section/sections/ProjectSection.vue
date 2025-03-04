<template>
  <SectionComponent class="max-w-[1280px]">
    <div class="flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md">
      <h1 class="font-title mb-6 text-3xl font-semibold">Projects</h1>
      <div class="flex flex-col gap-y-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
</script>
