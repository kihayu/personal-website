<template>
  <SectionComponent class="mt-0 mb-4 lg:mt-4 lg:mb-2">
    <div class="relative flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md">
      <h1 class="font-title mb-6 text-3xl font-semibold">Projects</h1>
      <div class="w-full bg-red-500 p-1">
        <div class="border-4 border-white p-2">
          <i class="font-semibold">Not final descriptions! Texts may be changed!</i>
        </div>
      </div>

      <ProjectDropdown :items="allTechnologies" v-model="selectedTechnologies" />

      <ClientOnly>
        <template #fallback>
          <!-- Static fallback for SSR -->
          <div class="flex flex-col gap-y-4">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
              <ProjectCard
                :title="project.title"
                :lead-text="project.leadText"
                :technologies="project.technologies"
                :project-name="project.id"
                @select="addToSelectedProjects(project.id)"
                @click="addToSelectedProjects(project.id)"
              />
            </div>
          </div>
          <!-- End of fallback -->
        </template>

        <!-- Desktop view  -->
        <div v-if="!isMobile" class="transition-container lg:block">
          <div key="project-list" class="flex flex-col gap-y-4">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
              <ProjectDetailCard
                v-if="selectedProjects.includes(project)"
                :project="project"
                @close="closeProjectDetails(project.id)"
              />
              <ProjectCard
                v-else
                :title="project.title"
                :lead-text="project.leadText"
                :technologies="project.technologies"
                :project-name="project.id"
                @select="addToSelectedProjects(project.id)"
                @click="addToSelectedProjects(project.id)"
              />
            </div>
          </div>
        </div>
        <!-- End of Desktop view -->

        <!-- Mobile view -->
        <div v-else class="relative lg:hidden">
          <div v-show="selectedProjectIds.length === 0" class="flex flex-col gap-y-4">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
              <ProjectCard
                :title="project.title"
                :lead-text="project.leadText"
                :technologies="project.technologies"
                :project-name="project.id"
                @select="addToSelectedProjects(project.id)"
                @click="addToSelectedProjects(project.id)"
              />
            </div>
          </div>
          <div
            v-if="selectedProjectIds.length !== 0 && isOneProjectSelected"
            class="fixed inset-0 z-50 overflow-y-auto bg-stone-800 lg:hidden"
          >
            <div class="p-6">
              <ProjectDetailCard :project="selectedProjects[0]" @close="closeProjectDetails(selectedProjects[0].id)" />
            </div>
          </div>
        </div>
        <!-- End of Mobile view -->
      </ClientOnly>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectDropdown from '~/components/projects/ProjectDropdown.vue'
import ProjectDetailCard from '~/components/projects/ProjectDetailCard.vue'
import { useProjectStore } from '~/store/project'
import { isMobile } from '~/utils/isMobile'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const projects = projectStore.projects
const selectedProjectIds = ref<Array<string>>([])

const selectedProjects = computed(() => {
  return projects.filter((p) => selectedProjectIds.value.includes(p.id))
})

const originalScrollPosition = ref(0)
const { y: scrollY } = useWindowScroll()

const lockScroll = () => {
  originalScrollPosition.value = scrollY.value
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${originalScrollPosition.value}px`
}

const unlockScroll = async () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  await new Promise((resolve) => setTimeout(resolve, 25))
  window.scrollTo(0, originalScrollPosition.value)
}

const isOneProjectSelected = computed(() => selectedProjects.value.length === 1)

const windowSize = useWindowSize()
watch(windowSize.width, () => {
  if (isMobile.value && isOneProjectSelected.value) {
    lockScroll()
  } else if (!isMobile.value) {
    unlockScroll()
  }
})

watch(selectedProjectIds.value, (newIds) => {
  if (!isMobile.value) {
    return
  }

  if (newIds.length > 0) {
    nextTick(() => {
      lockScroll()
    })
    return
  }

  unlockScroll()
})

const addToSelectedProjects = (id: string): void => {
  selectedProjectIds.value.push(id)
}

const closeProjectDetails = (id: string): void => {
  history.replaceState(null, document.title, window.location.pathname)
  selectedProjectIds.value.splice(selectedProjectIds.value.indexOf(id), 1)
}

const allTechnologies = computed(() => {
  const technologies = new Set<string>()
  projects.forEach((project) => {
    project.technologies.forEach((tech) => technologies.add(tech))
  })
  return Array.from(technologies).sort()
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

onMounted(() => {
  const projectId = route.hash.replace('#', '')
  if (projectId && projects.some((p) => p.id === projectId)) {
    selectedProjectIds.value = [projectId]
  }
})

onUnmounted(() => {
  if (isMobile.value && selectedProjectIds.value.length > 0) {
    unlockScroll()
  }
})
</script>
