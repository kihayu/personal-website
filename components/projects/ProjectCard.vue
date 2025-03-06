<template>
  <div
    class="project-card relative flex min-h-fit flex-col rounded-lg border border-neutral-400 p-4 text-white no-underline transition-all duration-300 hover:cursor-pointer hover:[&_.link-arrows]:scale-120"
    role="button"
    tabindex="0"
    :aria-label="`View details for ${title} project`"
    @keydown.enter="emit('select')"
    @keydown.space.prevent="emit('select')"
  >
    <h3 class="font-title text-2xl font-bold">{{ title }}</h3>
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
        <ChevronsRightIcon class="link-arrows transition duration-150" />
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
