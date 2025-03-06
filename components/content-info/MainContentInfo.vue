<template>
  <dialog
    class="flex h-full flex-col gap-y-4 overflow-y-auto bg-stone-800 px-6 pb-8 text-white lg:relative lg:h-full lg:w-auto lg:rounded-lg lg:p-0"
    :class="isMobile ? 'fixed inset-0 z-50' : ''"
  >
    <div
      class="sticky top-0 grid w-full cursor-pointer grid-cols-[40px_1fr_40px] grid-rows-1 justify-center border-b border-neutral-600 bg-stone-800 py-4 lg:pt-0"
      @click="emit('clear-section')"
      @keydown.enter="emit('clear-section')"
      @keydown.space.prevent="emit('clear-section')"
    >
      <span
        class="font-title flex h-full w-full items-center justify-center text-2xl text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-90 lg:active:text-neutral-200"
        tabindex="0"
      >
        ←
      </span>
      <h4 class="font-title flex justify-center text-2xl !leading-8 font-bold select-none md:text-3xl xl:text-4xl">
        {{ sectionToSectionName }}
      </h4>
    </div>
    <DesignInfo v-if="selectedSection === 'design'" />
    <DevelopInfo v-else-if="selectedSection === 'development'" />
    <DeployInfo v-else-if="selectedSection === 'deployment'" />
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
  scrollPosition: number
}

const props = defineProps<MainContentInfoProps>()

const sectionToSectionName = computed(
  () => props.selectedSection.charAt(0).toUpperCase() + props.selectedSection.slice(1),
)

export interface MainContentInfoEmits {
  'clear-section': []
}

const emit = defineEmits<MainContentInfoEmits>()
const originalScrollPosition = ref(props.scrollPosition)

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${props.scrollPosition}px`
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  window.scrollTo(0, originalScrollPosition.value)
}

const windowSize = useWindowSize()

watch(windowSize.width, () => {
  if (isMobile.value) {
    lockScroll()
    return
  }

  unlockScroll()
})

onBeforeMount(() => {
  if (isMobile.value) {
    lockScroll()
  }
})

onMounted(() => {
  window.history.pushState({ mainContentInfo: true }, '')
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)

  if (isMobile.value) {
    unlockScroll()
  }
})

const handlePopState = (event: PopStateEvent) => {
  if (event.state === null || !event.state.mainContentInfo) {
    emit('clear-section')
  }
}
</script>
