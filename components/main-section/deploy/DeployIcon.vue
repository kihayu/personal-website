<template>
  <div
    class="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300"
    :class="{
      [activeColorClassNames[color]]: currentStep >= activateStep,
      [colorClassNames[color]]: true,
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

const colorClassNames = computed(() => {
  return {
    blue: 'bg-blue-500/20 text-blue-400',
    orange: 'bg-orange-500/20 text-orange-400',
    red: 'bg-red-500/20 text-red-400',
    green: 'bg-green-500/20 text-green-400',
  }
})

const activeColorClassNames = computed(() => {
  return {
    blue: '!bg-blue-500/50 !text-blue-300 scale-110',
    orange: '!bg-orange-500/50 !text-orange-300 scale-110',
    red: '!bg-red-500/50 !text-red-300 scale-110',
    green: '!bg-green-500/50 !text-green-300 scale-110',
  }
})
</script>
