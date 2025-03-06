<template>
  <SectionComponent class="max-w-[1280px]">
    <div class="relative flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md">
      <h1 class="font-title mb-6 text-3xl font-semibold">Projects</h1>
      <div class="w-full bg-red-500 p-1">
        <div class="border-4 border-white p-2">
          <i class="font-semibold">Not final projects! Only examples!</i>
        </div>
      </div>

      <ProjectDropdown :items="allTechnologies" v-model="selectedTechnologies" />

      <div v-if="!isMobile" class="transition-container lg:block">
        <Transition name="project-expand" mode="out-in">
          <div v-if="selectedProjectId === ''" key="project-list" class="flex flex-col gap-y-4">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
              <ProjectCard
                :title="project.title"
                :lead-text="project.leadText"
                :technologies="project.technologies"
                :project-name="project.id"
                @select="selectProject(project.id)"
                @click="selectProject(project.id)"
              />
            </div>
          </div>

          <div v-else-if="selectedProject" key="project-detail">
            <ProjectDetailCard :project="selectedProject" @close="closeProjectDetails" />
          </div>
        </Transition>
      </div>

      <div v-if="isMobile" class="relative lg:hidden">
        <div v-show="selectedProjectId === ''" class="flex flex-col gap-y-4">
          <div v-for="project in filteredProjects" :key="project.id" class="project-card-container">
            <ProjectCard
              :title="project.title"
              :lead-text="project.leadText"
              :technologies="project.technologies"
              :project-name="project.id"
              @select="selectProject(project.id)"
              @click="selectProject(project.id)"
            />
          </div>
        </div>

        <Transition name="slide-in">
          <div
            v-if="selectedProjectId !== '' && selectedProject"
            class="fixed inset-0 z-50 overflow-y-auto bg-stone-800 lg:hidden"
          >
            <div class="p-6">
              <ProjectDetailCard :project="selectedProject" @close="closeProjectDetails" />
            </div>
          </div>
        </Transition>
      </div>
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
const selectedProjectId = ref('')

const selectedProject = computed(() => {
  return projects.find((p) => p.id === selectedProjectId.value)
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
  await new Promise((resolve) => setTimeout(resolve, 50))
  window.scrollTo(0, originalScrollPosition.value)
}

const windowSize = useWindowSize()
watch(windowSize.width, () => {
  if (isMobile.value && selectedProjectId.value) {
    lockScroll()
  } else if (!isMobile.value) {
    unlockScroll()
  }
})

watch(selectedProjectId, (newId) => {
  if (!isMobile.value) {
    return
  }

  if (newId) {
    nextTick(() => {
      lockScroll()
    })
    return
  }

  unlockScroll()
})

watch(
  selectedProjectId,
  (newId) => {
    if (!newId) {
      return
    }

    router.push({ path: '/', hash: `#${newId}` })
  },
  { immediate: false },
)

const selectProject = (id: string): void => {
  selectedProjectId.value = id
}

const closeProjectDetails = (): void => {
  history.replaceState(null, document.title, window.location.pathname)
  selectedProjectId.value = ''
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
    selectedProjectId.value = projectId
  }
})

onUnmounted(() => {
  if (isMobile.value && selectedProjectId.value) {
    unlockScroll()
  }
})
</script>

<style lang="scss">
.transition-container {
  min-height: 100px;
  position: relative;
}

.project-expand {
  &-enter-active,
  &-leave-active {
    transition: all 0.4s ease;
    width: 100%;
  }

  &-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  &-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: scale(1);
  }
}

.project-card-container .project-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

.slide-in {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
