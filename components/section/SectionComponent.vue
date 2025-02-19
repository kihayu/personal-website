<template>
  <div class="flex h-screen flex-col" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface SectionComponentProps {
  verticalCenter?: boolean
}

const props = withDefaults(defineProps<SectionComponentProps>(), {
  verticalCenter: false,
})

const classes = computed(() => {
  return {
    'justify-center': props.verticalCenter,
  }
})
</script>

<style lang="scss" scoped></style>
