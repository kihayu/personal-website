<template>
  <AboutMeCard :heading="text(node.props.heading)" :annotate="annotate">
    <CmsRichText
      :value="node.props.body"
      tag="div"
      class="font-paragraph flex flex-col gap-4 text-lg will-change-contents md:text-xl [&_a]:underline [&_li]:ml-6 [&_li]:list-disc"
      v-bind="annotate('body')"
    />
  </AboutMeCard>
</template>

<script setup lang="ts">
import { type BlockProps, CmsRichText, useAnnotate } from '@cms/adapter-vue'
import AboutMeCard from '~/components/content/AboutMeCard.vue'
import { text } from '~/utils/blockProps'

defineProps<BlockProps>()
const annotate = useAnnotate()
</script>
