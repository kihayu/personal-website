<template>
  <div class="mx-4 w-full max-w-[1280px]" :class="{ 'lg:min-h-screen': fillScreen }" v-bind="annotate()">
    <div class="flex flex-col gap-y-4 lg:gap-y-8" v-bind="annotateSlot(slotName)">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface SectionComponentProps {
  fillScreen?: boolean
  slotName?: string
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

withDefaults(defineProps<SectionComponentProps>(), {
  fillScreen: false,
  slotName: 'body',
  annotate: () => ({}),
  annotateSlot: () => ({}),
})
</script>
