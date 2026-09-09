<template>
  <section class="w-full rounded-md bg-stone-800 p-6 shadow-md" v-bind="annotate()">
    <h2 v-if="hasText(node.props.heading)" class="font-title text-3xl font-semibold" v-bind="annotate('heading')">
      {{ node.props.heading }}
    </h2>
    <CmsRichText
      :value="node.props.body"
      tag="div"
      class="font-paragraph mt-3 flex flex-col gap-4 text-lg md:text-xl [&_a]:underline [&_li]:ml-6 [&_li]:list-disc"
      v-bind="annotate('body')"
    />
  </section>
</template>

<script setup lang="ts">
import { type BlockProps, CmsRichText, hasText, useAnnotate } from '@cms/adapter-vue'

defineProps<BlockProps>()
const annotate = useAnnotate()
</script>
