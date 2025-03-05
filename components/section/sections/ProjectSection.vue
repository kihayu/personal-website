<template>
  <SectionComponent class="max-w-[1280px]">
    <div class="flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md">
      <h1 class="font-title mb-6 text-3xl font-semibold">Projects</h1>
      <div class="w-full bg-red-500 p-1">
        <div class="border-4 border-white p-2">
          <i class="font-semibold">Not final projects! Only examples!</i>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <ProjectCard
          title="Personal Website"
          description="A responsive Vue.js website with Nuxt.js"
          :technologies="['Vue', 'Nuxt', 'TailwindCSS']"
          :project-name="1"
        />
        <ProjectCard
          title="E-commerce Platform"
          description="A full-featured online store with cart and checkout"
          :technologies="['Vue', 'Node.js', 'MongoDB']"
          :project-name="2"
        />
        <ProjectCard
          title="Portfolio App"
          description="Mobile-first design for showcasing creative work"
          :technologies="['React Native', 'Firebase']"
          :project-name="3"
        />
      </div>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
</script>
