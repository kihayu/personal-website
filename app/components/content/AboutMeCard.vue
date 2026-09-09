<template>
  <section class="h-full w-full rounded-md bg-stone-800 p-4 shadow-md" v-bind="annotate()">
    <h2 v-if="heading" :id="headingId" class="font-title text-3xl font-semibold" v-bind="annotate('heading')">
      {{ heading }}
    </h2>
    <div class="mt-3 flex flex-col gap-4 will-change-contents" :aria-labelledby="heading ? headingId : undefined">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useId } from 'vue'

export interface AboutMeCardProps {
  heading?: string
  annotate?: (field?: string) => Record<string, string>
}

withDefaults(defineProps<AboutMeCardProps>(), {
  heading: '',
  annotate: () => ({}),
})

const headingId = useId()
</script>

<style>
.font-paragraph {
  font-display: swap;
}
</style>
