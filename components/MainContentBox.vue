<template>
  <div
    v-bind="$attrs"
    class="aspect-[16/10] w-0 max-w-[660px] flex-col gap-y-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 shadow-md transition-all duration-300 ease-in-out lg:w-[65%]"
  >
    <div class="grid grid-cols-[auto_1fr] grid-rows-1">
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full bg-red-500" />
        <div class="h-3 w-3 rounded-full bg-yellow-500" />
        <div class="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <span class="flex justify-center text-xs text-neutral-200 select-none" :class="{ italic: !title }" role="status">
        {{ title || 'Hover over the Titles' }}
      </span>
    </div>
    <div class="relative h-full rounded-md bg-neutral-900 p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface MainContentBoxProps {
  title?: string
}

defineProps<MainContentBoxProps>()

defineOptions({
  inheritAttrs: false,
})
</script>
