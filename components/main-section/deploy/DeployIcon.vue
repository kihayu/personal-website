<template>
  <div
    class="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300"
    :class="{
      [`scale-110 !bg-${color}-500/50 !text-${color}-300`]: currentStep >= activateStep,
      [`bg-${color}-500/20 text-${color}-400`]: true,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface DeployIconProps {
  currentStep: number
  activateStep: number
  color: 'blue' | 'orange' | 'red' | 'green'
}

defineProps<DeployIconProps>()
</script>
