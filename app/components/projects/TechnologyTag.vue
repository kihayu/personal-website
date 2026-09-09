<template>
  <span class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white" v-bind="annotate()">
    <span v-bind="annotate('label')">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
export interface TechnologyTagProps {
  label?: string
  annotate?: (field?: string) => Record<string, string>
}

withDefaults(defineProps<TechnologyTagProps>(), {
  label: '',
  annotate: () => ({}),
})
</script>
