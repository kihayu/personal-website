<template>
  <SectionComponent :fill-screen="fillScreen" slot-name="body" :annotate="annotate" :annotate-slot="annotateSlot">
    <CmsSlot name="body" annotated />
  </SectionComponent>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { computed } from 'vue'
import SectionComponent from '~/components/section/SectionComponent.vue'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const fillScreen = computed(() => props.node.props.fillScreen === true)
</script>
