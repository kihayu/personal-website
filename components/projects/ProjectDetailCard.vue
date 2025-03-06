<template>
  <div class="flex flex-col gap-y-6">
    <div class="flex justify-between">
      <h2 class="font-title text-4xl font-bold">{{ project.title }}</h2>
      <button
        @click="closeDetails"
        class="flex translate-y-1.5 cursor-pointer justify-center text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-90"
        aria-label="Close project details"
      >
        <XIcon class="h-7 w-7 translate-y-0.25" :stroke-width="2.5" tabindex="0" />
      </button>
    </div>

    <p class="font-paragraph h-full w-full border-b border-neutral-600 pb-4 text-xl">
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
import type { Project } from '~/types/project'

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
</script>
