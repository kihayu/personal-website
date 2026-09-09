<template>
  <TechnologyTag :label="text(node.props.label)" :annotate="annotate" />
</template>

<script setup lang="ts">
import { type BlockProps, useAnnotate } from '@cms/adapter-vue'
import TechnologyTag from '~/components/projects/TechnologyTag.vue'
import { text } from '~/utils/blockProps'

defineProps<BlockProps>()
const annotate = useAnnotate()
</script>
