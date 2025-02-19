<template>
  <div class="ml-16 mr-16 flex h-screen flex-col xl:ml-64 xl:mr-32" :class="classes">
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
