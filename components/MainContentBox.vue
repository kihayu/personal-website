<template>
  <div
    v-bind="$attrs"
    class="aspect-[16/10] w-0 max-w-[960px] flex-col gap-y-4 rounded-lg bg-neutral-800 p-4 shadow-[0px_0px_0px_1px_rgba(255_255_255_0.1)] transition-all duration-300 ease-in-out lg:w-[65%]"
  >
    <div class="flex items-center gap-2">
      <div class="h-3 w-3 rounded-full bg-red-500" />
      <div class="h-3 w-3 rounded-full bg-yellow-500" />
      <div class="h-3 w-3 rounded-full bg-green-500" />
    </div>
    <div class="relative h-full rounded-md bg-neutral-900 p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>
