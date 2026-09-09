<template>
  <div class="mx-4 w-full max-w-[1280px]" :class="{ 'lg:min-h-screen': fillScreen }" v-bind="annotate()">
    <div class="flex flex-col gap-y-4 lg:gap-y-8" v-bind="annotateSlot('body')">
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

const fillScreen = computed(() => props.node.props.fillScreen === true)
</script>
