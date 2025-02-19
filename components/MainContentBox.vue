<template>
  <div class="flex flex-col">
    <div
      v-bind="$attrs"
      class="content-box aspect-[16/10] self-center rounded-2xl bg-neutral-950 p-6 shadow-[0px_0px_24px_0px_rgb(75_75_75)] filter"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>
