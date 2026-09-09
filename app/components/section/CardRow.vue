<template>
  <div class="w-full" v-bind="annotate()">
    <div class="w-full justify-center" :class="layoutClasses" v-bind="annotateSlot(slotName)">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type CardRowVariant = 'sidebar' | 'equal' | 'stacked'

export interface CardRowProps {
  variant?: CardRowVariant
  slotName?: string
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

const props = withDefaults(defineProps<CardRowProps>(), {
  variant: 'stacked',
  slotName: 'body',
  annotate: () => ({}),
  annotateSlot: () => ({}),
})

const LAYOUTS: Record<CardRowVariant, string> = {
  sidebar: 'flex flex-col gap-4 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr] lg:gap-8',
  equal: 'flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-rows-1 lg:gap-8',
  stacked: 'flex flex-col gap-4 lg:gap-8',
}

const layoutClasses = computed(() => LAYOUTS[props.variant] ?? LAYOUTS.stacked)
</script>
