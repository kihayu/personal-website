<template>
  <ProjectGallery
    v-model:selected="selectedTechnologies"
    :heading="text(node.props.heading)"
    :filter-label="text(node.props.filterLabel) || undefined"
    :filter-placeholder="text(node.props.filterPlaceholder) || undefined"
    :scroll-hint="text(node.props.scrollHint)"
    :technologies="technologies"
    :editing="editing"
    slot-name="items"
    :annotate="annotate"
    :annotate-slot="annotateSlot"
  >
    <CmsSlot name="items" annotated />
  </ProjectGallery>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, provide, ref } from 'vue'
import ProjectGallery from '~/components/projects/ProjectGallery.vue'
import { text } from '~/utils/blockProps'
import { GALLERY_KEY } from './gallery.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const selectedTechnologies = ref<Array<string>>([])
const editing = computed(() => isEditMode(props.context))

const technologies = computed(() => {
  const names = new Set<string>()
  for (const project of props.node.slots?.items ?? []) {
    for (const tag of project.slots?.technologies ?? []) {
      const label = text(tag.props.label)
      if (label.length > 0) {
        names.add(label)
      }
    }
  }
  return [...names].sort()
})

provide(GALLERY_KEY, { selected: selectedTechnologies })
</script>
