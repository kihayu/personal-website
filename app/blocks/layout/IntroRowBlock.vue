<template>
  <CardRow :variant="variant" slot-name="body" :annotate="annotate" :annotate-slot="annotateSlot">
    <CmsSlot name="body" annotated />
  </CardRow>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { computed } from 'vue'
import CardRow, { type CardRowVariant } from '~/components/section/CardRow.vue'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const VARIANTS: ReadonlyArray<CardRowVariant> = ['sidebar', 'equal', 'stacked']

const variant = computed<CardRowVariant>(() => {
  const value = props.node.props.variant
  return VARIANTS.find((known) => known === value) ?? 'stacked'
})
</script>
