<template>
  <div
    class="project-card relative flex min-h-fit flex-col rounded-lg border border-neutral-400 p-4 text-white no-underline transition-all duration-300 hover:cursor-pointer active:scale-[0.98] active:bg-stone-700 lg:active:scale-100 lg:active:bg-transparent hover:[&_.link-arrows]:scale-120"
    tabindex="0"
    role="button"
    :aria-label="`View details for ${title} project`"
    @keydown.enter="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <h2 class="font-title text-2xl font-bold">{{ title }}</h2>
    <span class="font-paragraph flex-1 text-lg">{{ leadText }}</span>
    <div class="mt-6 flex justify-between">
      <div class="flex flex-row flex-wrap gap-2">
        <span
          v-for="technology in technologies"
          :key="technology"
          class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white"
        >
          {{ technology }}
        </span>
      </div>
      <div class="link-arrows self-end select-none">
        <ChevronsRightIcon class="link-arrows transition duration-150" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronsRight as ChevronsRightIcon } from 'lucide-vue-next'

export interface ProjectCardProps {
  title: string
  leadText: string
  technologies: string[]
  projectName: string
}

export interface ProjectCardEmits {
  select: []
}

defineProps<ProjectCardProps>()
const emit = defineEmits<ProjectCardEmits>()
</script>
