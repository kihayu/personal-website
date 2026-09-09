<template>
  <div class="w-full" v-bind="annotate()">
    <div class="w-full justify-center" :class="layoutClasses" v-bind="annotateSlot('body')">
      <CmsSlot name="body" annotated />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { computed } from 'vue'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const LAYOUTS: Record<string, string> = {
  sidebar: 'flex flex-col gap-4 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr] lg:gap-8',
  equal: 'flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-rows-1 lg:gap-8',
  stacked: 'flex flex-col gap-4 lg:gap-8',
}

const layoutClasses = computed(() => {
  const variant = props.node.props.variant
  return (typeof variant === 'string' ? LAYOUTS[variant] : undefined) ?? LAYOUTS.stacked
})
</script>
