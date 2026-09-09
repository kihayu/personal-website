<template>
  <span class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white" v-bind="annotate()">
    <span v-bind="annotate('label')">{{ node.props.label }}</span>
  </span>
</template>

<script setup lang="ts">
import { type BlockProps, useAnnotate } from '@cms/adapter-vue'

defineProps<BlockProps>()
const annotate = useAnnotate()
</script>
