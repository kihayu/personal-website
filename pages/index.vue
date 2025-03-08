<!-- Root container needed! -->
<template>
  <div id="root" class="flex flex-col gap-y-4">
    <div ref="mainSection">
      <MainSection id="main-section" class="mx-4 max-w-[1280px] lg:min-h-screen" />
    </div>
    <div ref="projectSection">
      <ProjectSection id="project-section" class="mx-4 min-h-screen max-w-[1280px]" />
    </div>
    <ClientOnly>
      <div
        class="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showScrollArrow }"
        @click="scrollToProject"
      >
        <span class="font-semibold text-white">Project list</span>
        <ChevronsDownIcon class="h-6 w-6 text-white" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import MainSection from '~/components/section/sections/MainSection.vue'
import ProjectSection from '~/components/section/sections/ProjectSection.vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ChevronsDown as ChevronsDownIcon } from 'lucide-vue-next'
import { isMobile } from '~/utils/isMobile'
import { useAppStore } from '~/store/app'

const { y: scrollY } = useWindowScroll()
const { height: windowHeight } = useWindowSize()
const appStore = useAppStore()
const isAtMainSection = ref(true)
const isScrolling = ref(false)
const projectSectionOffset = ref(0)
const threshold = ref(1030)
const showScrollArrow = computed(
  () => !isMobile.value && isAtMainSection.value && windowHeight.value >= threshold.value && !isScrolling.value,
)

const mainSection = ref<HTMLElement | null>(null)
const projectSection = ref<HTMLElement | null>(null)

const scrollToProject = () => {
  if (!projectSection.value) {
    return
  }

  isScrolling.value = true
  isAtMainSection.value = false

  projectSection.value.scrollIntoView({ behavior: 'smooth' })

  setTimeout(() => {
    isScrolling.value = false
  }, 1000)
}

const scrollToMain = () => {
  isScrolling.value = true
  isAtMainSection.value = true

  window.scrollTo({ top: 0, behavior: 'smooth' })

  setTimeout(() => {
    isScrolling.value = false
  }, 1000)
}

const handleWheel = (event: WheelEvent) => {
  if (windowHeight.value < threshold.value) {
    return
  }

  if (isScrolling.value) {
    event.preventDefault()
    return
  }

  if (appStore.isDropdownOpen) {
    return
  }

  if (isAtMainSection.value && event.deltaY > 0) {
    event.preventDefault()
    scrollToProject()
    return
  }

  const isAtTopOfProjects = Math.abs(scrollY.value - projectSectionOffset.value) < 25

  if (!isAtMainSection.value && event.deltaY < 0 && isAtTopOfProjects) {
    event.preventDefault()
    scrollToMain()
  }
}

watch(scrollY, (newScrollY: number) => {
  if (isScrolling.value) {
    return
  }

  isAtMainSection.value = newScrollY < projectSectionOffset.value
})

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
  isAtMainSection.value = true

  nextTick(() => {
    if (projectSection.value) {
      projectSectionOffset.value = projectSection.value.getBoundingClientRect().top + scrollY.value
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>
