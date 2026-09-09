<template>
  <section class="w-full rounded-md bg-stone-800 p-6 shadow-md" v-bind="annotate()">
    <h2 v-if="heading" class="font-title text-3xl font-semibold" v-bind="annotate('heading')">{{ heading }}</h2>
    <div class="mt-3">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
export interface TextCardProps {
  heading?: string
  annotate?: (field?: string) => Record<string, string>
}

withDefaults(defineProps<TextCardProps>(), {
  heading: '',
  annotate: () => ({}),
})
</script>
