<template>
  <div
    class="relative flex min-h-fit flex-col gap-y-6 text-white no-underline"
    :class="overlaid ? 'p-0' : 'rounded-lg border border-neutral-400 p-4'"
  >
    <div class="flex justify-between">
      <div class="flex flex-col gap-x-4">
        <h2 class="project-title font-title text-3xl font-bold" v-bind="annotate('title')">{{ title }}</h2>
        <span v-if="capacity" class="font-title text-lg text-neutral-400" v-bind="annotate('capacity')">
          {{ capacity }}
        </span>
      </div>
      <button
        v-if="closable"
        class="flex h-fit translate-y-1 cursor-pointer justify-center text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-110"
        aria-label="Close project details"
        @click="emit('close')"
      >
        <XIcon class="h-7 w-7 translate-y-0.25" :stroke-width="2.5" />
      </button>
    </div>

    <p v-if="leadText" class="font-paragraph text-lg text-neutral-300" v-bind="annotate('leadText')">{{ leadText }}</p>

    <div class="font-paragraph h-full w-full border-b border-neutral-600 pb-4 text-lg">
      <slot name="description" />
    </div>

    <div class="grid grid-cols-[1fr_auto]">
      <div class="flex flex-row flex-wrap gap-2" v-bind="annotateSlot(technologiesSlot)">
        <slot name="technologies" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from '@lucide/vue'

export interface ProjectDetailCardProps {
  title: string
  capacity?: string
  leadText?: string
  closable?: boolean
  technologiesSlot?: string
  overlaid?: boolean
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

withDefaults(defineProps<ProjectDetailCardProps>(), {
  capacity: '',
  leadText: '',
  closable: true,
  technologiesSlot: 'technologies',
  overlaid: false,
  annotate: () => ({}),
  annotateSlot: () => ({}),
})

export interface ProjectDetailCardEmits {
  close: []
}

const emit = defineEmits<ProjectDetailCardEmits>()
</script>
