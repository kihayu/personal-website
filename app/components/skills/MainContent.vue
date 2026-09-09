<template>
  <nav class="flex w-full flex-col gap-x-16 gap-y-12">
    <div
      class="flex w-full flex-col items-center justify-between gap-4"
      :class="stacked ? 'gap-8' : 'lg:flex-row lg:gap-0 lg:px-[12.5%]'"
      v-bind="annotateSlot(slotName)"
      @mouseleave="emit('leave')"
    >
      <slot name="topics" />
    </div>
    <MainContentWindow
      v-if="!stacked"
      class="mx-auto hidden lg:flex"
      :class="windowClasses"
      :title="title"
      :hint="hint"
      :hint-attrs="annotate('hint')"
    >
      <slot name="preview" />
    </MainContentWindow>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MainContentWindow from '~/components/skills/MainContentWindow.vue'

export interface MainContentProps {
  title?: string
  hint?: string
  stacked?: boolean
  slotName?: string
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

const props = withDefaults(defineProps<MainContentProps>(), {
  title: '',
  hint: '',
  stacked: false,
  slotName: 'items',
  annotate: () => ({}),
  annotateSlot: () => ({}),
})

export interface MainContentEmits {
  leave: []
}

const emit = defineEmits<MainContentEmits>()

const windowClasses = computed(() => (props.title ? 'lg:w-[85%] 2xl:w-[65%]' : ''))
</script>
