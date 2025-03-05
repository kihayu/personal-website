<template>
  <div
    ref="pageHeader"
    class="flex h-full flex-col gap-y-4 overflow-y-auto bg-stone-800 px-6 pb-8 text-white lg:relative lg:h-full lg:w-auto lg:rounded-lg lg:p-0"
  >
    <div
      class="sticky top-0 grid w-full cursor-pointer grid-cols-[40px_1fr_40px] grid-rows-1 justify-center border-b border-neutral-600 bg-stone-800 py-4 lg:pt-0"
      @click="navigateBack"
      @keydown.enter="navigateBack"
      @keydown.space.prevent="navigateBack"
    >
      <span
        class="font-title flex h-full w-full items-center justify-center text-2xl text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-90 lg:active:text-neutral-200"
        tabindex="0"
      >
        ←
      </span>
      <h4 class="font-title flex justify-center text-2xl !leading-8 font-bold select-none md:text-3xl xl:text-4xl">
        {{ 'Project Details' }}
      </h4>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { isMobile } from '~/utils/isMobile'

const route = useRoute()
const router = useRouter()

const navigateBack = () => {
  router.back()
}

const pageHeader = ref<HTMLElement | null>(null)
onMounted(() => {
  if (isMobile.value && import.meta.client) {
    pageHeader.value?.classList.add('fixed', 'inset-0', 'z-50')
  }
})
</script>
