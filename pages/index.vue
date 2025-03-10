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

const { y: scrollY } = useWindowScroll()
const { height: windowHeight } = useWindowSize()
const isAtMainSection = ref(true)
const isScrolling = ref(false)
const topScrollhreshold = ref(windowHeight.value / 10)
const showArrowsThreshold = ref(1030)
const showScrollArrow = computed(
  () =>
    !isMobile.value &&
    !isScrolling.value &&
    isAtMainSection.value &&
    windowHeight.value >= showArrowsThreshold.value &&
    scrollY.value <= topScrollhreshold.value,
)

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
</script>
