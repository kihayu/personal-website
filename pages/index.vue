<template>
  <div id="root" class="flex flex-col gap-y-4">
    <div ref="mainSection" id="main-content">
      <MainSection class="mx-4 max-w-[1280px] lg:min-h-screen" />
    </div>
    <div ref="projectSection">
      <ProjectSection class="mx-4 min-h-screen max-w-[1280px]" />
    </div>
    <FooterComponent />
    <ClientOnly>
      <!-- Scroll down arrow for desktop -->
      <button
        type="button"
        class="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showScrollArrow }"
        @click="scrollToProject"
        aria-label="Scroll to project list"
      >
        <span class="font-semibold text-white">Project list</span>
        <ChevronsDownIcon class="h-6 w-6 text-white" aria-hidden="true" />
      </button>
      <!-- Scroll to top button -->
      <button
        v-show="showScrollToTop"
        type="button"
        class="fixed bottom-4 right-4 z-10 flex cursor-pointer flex-col items-center opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showScrollToTop }"
        @click="scrollToTop"
        aria-label="Scroll to top"
      >
        <ChevronsUpIcon class="h-6 w-6 text-white" aria-hidden="true" />
        <span class="font-semibold text-white">Back to top</span>
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import MainSection from '~/components/section/sections/MainSection.vue'
import ProjectSection from '~/components/section/sections/ProjectSection.vue'
import FooterComponent from '~/components/FooterComponent.vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ChevronsDown as ChevronsDownIcon, ChevronsUp as ChevronsUpIcon } from 'lucide-vue-next'
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

const showScrollToTop = computed(() => scrollY.value > 500)

const projectSection = ref<HTMLElement | null>(null)
const mainSection = ref<HTMLElement | null>(null)

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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
