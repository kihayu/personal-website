<template>
  <dialog
    ref="dialog"
    class="m-auto max-h-[90dvh] w-full max-w-[min(1100px,92vw)] flex-col gap-y-4 overflow-y-auto bg-stone-800 px-6 pb-8 text-white backdrop:bg-black/60 open:flex lg:rounded-lg"
    :aria-label="title"
    @close="emit('close')"
    @cancel.prevent="close"
    @click="onBackdropClick"
  >
    <div
      class="sticky top-0 grid w-full cursor-pointer grid-cols-[40px_1fr_40px] grid-rows-1 justify-center border-b border-neutral-600 bg-stone-800 py-4"
      role="button"
      tabindex="0"
      aria-label="Close content info"
      @click="close"
      @keydown.enter="close"
      @keydown.space.prevent="close"
    >
      <div />
      <h4 class="font-title flex justify-center text-2xl !leading-8 font-bold select-none md:text-3xl xl:text-4xl">
        {{ title }}
      </h4>
      <div
        class="flex h-fit -translate-x-2 translate-y-1 items-center justify-center text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-110"
      >
        <XIcon class="h-7 w-7 translate-y-0.25" :stroke-width="2.5" aria-hidden="true" />
      </div>
    </div>
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { XIcon } from '@lucide/vue'

export interface MainContentInfoProps {
  title: string
}

defineProps<MainContentInfoProps>()

export interface MainContentInfoEmits {
  close: []
}

const emit = defineEmits<MainContentInfoEmits>()

const dialog = ref<HTMLDialogElement | null>(null)
const locked = useScrollLock(typeof document === 'undefined' ? null : document.body)

const close = (): void => {
  dialog.value?.close()
}

const onBackdropClick = (event: MouseEvent): void => {
  if (event.target === dialog.value) {
    close()
  }
}

const onPopState = (event: PopStateEvent): void => {
  if (event.state === null || !event.state.mainContentInfo) {
    close()
  }
}

onMounted(() => {
  dialog.value?.showModal()
  locked.value = true
  window.history.pushState({ mainContentInfo: true }, '')
  window.addEventListener('popstate', onPopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', onPopState)
  locked.value = false
})
</script>
