<template>
  <figure class="m-0 rounded-md bg-stone-900 p-3" v-bind="annotate()">
    <figcaption class="font-title mb-1 text-xs text-neutral-400" v-bind="annotate('language')">
      {{ language }}
    </figcaption>
    <pre class="overflow-x-auto font-mono text-xs whitespace-pre text-neutral-200" v-bind="annotate('code')">{{
      code
    }}</pre>
  </figure>
</template>

<script setup lang="ts">
export interface CodeSamplePreviewProps {
  language?: string
  code?: string
  annotate?: (field?: string) => Record<string, string>
}

withDefaults(defineProps<CodeSamplePreviewProps>(), {
  language: '',
  code: '',
  annotate: () => ({}),
})
</script>
