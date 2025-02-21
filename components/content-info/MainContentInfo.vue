<template>
  <dialog
    class="backdrop flex h-full flex-col gap-y-4 overflow-y-auto bg-stone-800 px-6 pt-4 pb-8 text-white lg:relative lg:m-4 lg:h-full lg:w-auto lg:rounded-lg lg:p-0"
    :class="isMobile ? 'fixed inset-0 z-50' : ''"
  >
    <div class="grid w-full grid-cols-[40px_1fr_40px] grid-rows-1 justify-center border-b border-neutral-600 pb-4">
      <span
        class="flex h-full w-full cursor-pointer items-center justify-center text-2xl text-neutral-400"
        tabindex="0"
        @click="emit('clear-section')"
        @keydown.enter="emit('clear-section')"
        @keydown.space.prevent="emit('clear-section')"
      >
        ←
      </span>
      <h4 class="font-title flex justify-center text-2xl font-bold md:text-3xl xl:text-4xl">
        {{ sectionToSectionName }}
      </h4>
    </div>
    <DesignInfo v-if="selectedSection === 'design'" />
    <DevelopInfo v-else-if="selectedSection === 'develop'" />
    <DeployInfo v-else-if="selectedSection === 'deploy'" />
  </dialog>
</template>

<script setup lang="ts">
import DesignInfo from '~/components/content-info/DesignInfo.vue'
import DevelopInfo from '~/components/content-info/DevelopInfo.vue'
import DeployInfo from '~/components/content-info/DeployInfo.vue'
import { isMobile } from '~/utils/isMobile'
import { useWindowSize } from '@vueuse/core'

export interface MainContentInfoProps {
  selectedSection: string
}

const props = defineProps<MainContentInfoProps>()

const sectionToSectionName = computed(
  () => props.selectedSection.charAt(0).toUpperCase() + props.selectedSection.slice(1),
)

const emit = defineEmits(['clear-section'])

let scrollPosition = 0

const lockScroll = () => {
  scrollPosition = window.scrollY
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${scrollPosition}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  window.scrollTo(0, scrollPosition)
}

const windowSize = useWindowSize()

watch(windowSize.width, () => {
  if (isMobile.value) {
    lockScroll()
    return
  }

  unlockScroll()
})

onMounted(() => {
  if (isMobile.value) {
    lockScroll()
  }
})

onMounted(() => {
  if (isMobile.value) {
    lockScroll()
  }
})

onUnmounted(() => {
  if (isMobile.value) {
    unlockScroll()
  }
})
</script>
