<template>
  <SectionComponent class="max-w-[1280px]">
    <div class="flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md">
      <h1 class="font-title mb-6 text-3xl font-semibold">Projects</h1>
      <div class="w-full bg-red-500 p-1">
        <div class="border-4 border-white p-2">
          <i class="font-semibold">Not final projects! Only examples!</i>
        </div>
      </div>

      <ProjectDropdown :items="allTechnologies" v-model="selectedTechnologies" />

      <div class="flex flex-col gap-y-4">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :title="project.title"
          :lead-text="project.leadText"
          :technologies="project.technologies"
          :project-name="project.id"
        />
      </div>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectDropdown from '~/components/projects/ProjectDropdown.vue'
import { useProjectStore } from '~/store/project'

const projectStore = useProjectStore()

// TODO: Data will move to an application store at a later point
const projects = projectStore.projects

const allTechnologies = computed(() => {
  const techs = new Set<string>()
  projects.forEach((project) => {
    project.technologies.forEach((tech) => techs.add(tech))
  })
  return Array.from(techs).sort()
})

const selectedTechnologies = ref<Array<string>>([])

const filteredProjects = computed(() => {
  if (selectedTechnologies.value.length === 0) {
    return projects
  }

  return projects.filter((project) => {
    return selectedTechnologies.value.some((tech) => project.technologies.includes(tech))
  })
})
</script>
