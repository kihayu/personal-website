<template>
  <div
    class="relative flex min-h-fit flex-col gap-y-6 rounded-lg border border-neutral-400 p-4 text-white no-underline"
  >
    <div class="flex justify-between">
      <div class="flex flex-row items-center gap-x-4">
        <h2
          class="project-title font-title text-3xl font-bold after:ml-2 after:inline-block after:h-8 after:w-8 after:translate-y-1 after:bg-white after:content-[''] md:after:ml-4"
          :class="{
            'project-title__solo': project.capacity === 'Solo',
            'project-title__team': project.capacity === 'Collaborator',
          }"
        >
          {{ project.title }}
        </h2>
      </div>
      <button
        @click="closeDetails"
        class="flex h-fit translate-y-1 cursor-pointer justify-center text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-110"
        aria-label="Close project details"
      >
        <XIcon class="h-7 w-7 translate-y-0.25" :stroke-width="2.5" />
      </button>
    </div>
    <p class="font-paragraph h-full w-full border-b border-neutral-600 pb-4 text-lg">
      {{ project.description }}
    </p>

    <div class="flex flex-row flex-wrap gap-2">
      <span
        v-for="technology in project.technologies"
        :key="technology"
        class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white"
      >
        {{ technology }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import type { Project } from '~/types/Project'
import { isMobile } from '~/utils/isMobile'

export interface ProjectDetailCardProps {
  project: Project
}

export interface ProjectDetailCardEmits {
  close: []
}

defineProps<ProjectDetailCardProps>()
const emit = defineEmits<ProjectDetailCardEmits>()

const closeDetails = (): void => {
  emit('close')
}

onMounted(() => {
  if (!isMobile.value) {
    return
  }

  window.history.pushState({ showProjectDetail: true }, '')
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  if (!isMobile.value) {
    return
  }

  window.removeEventListener('popstate', handlePopState)
})

const handlePopState = (event: PopStateEvent) => {
  if (event.state === null || !event.state.showProjectDetail) {
    emit('close')
  }
}
</script>

<style lang="scss">
.project-title {
  &__solo::after {
    mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+')
      no-repeat 50% 50%;
    mask-size: cover;
  }

  &__team::after {
    mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PHBhdGggZD0iTTIyIDIxdi0yYTQgNCAwIDAgMC0zLTMuODciLz48cGF0aCBkPSJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1Ii8+PC9zdmc+')
      no-repeat 50% 50%;
    mask-size: cover;
  }
}
</style>
