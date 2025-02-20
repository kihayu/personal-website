<template>
  <div class="flex h-8 w-8 items-center justify-center rounded transition-colors" :class="{ 'bg-neutral-700': active }">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface ToolbarIconProps {
  active?: boolean
}

withDefaults(defineProps<ToolbarIconProps>(), {
  active: false,
})
</script>
