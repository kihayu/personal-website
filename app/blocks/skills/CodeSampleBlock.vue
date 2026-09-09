<template>
  <CodeSamplePreview :language="text(node.props.language)" :code="text(node.props.code)" :annotate="annotate" />
</template>

<script setup lang="ts">
import { type BlockProps, useAnnotate } from '@cms/adapter-vue'
import CodeSamplePreview from '~/components/skills/CodeSamplePreview.vue'
import { text } from '~/utils/blockProps'

defineProps<BlockProps>()
const annotate = useAnnotate()
</script>
