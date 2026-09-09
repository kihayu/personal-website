<template>
  <div
    v-show="visible"
    :id="anchor"
    class="project-card-container"
    :class="{ 'fixed inset-0 z-50 overflow-y-auto bg-stone-800 p-6': overlaid }"
    v-bind="annotate()"
  >
    <ProjectDetailCard
      v-if="expanded"
      :title="text(node.props.title)"
      :capacity="text(node.props.capacity)"
      :lead-text="editing ? text(node.props.leadText) : ''"
      :closable="!editing"
      :overlaid="overlaid"
      technologies-slot="technologies"
      :annotate="annotate"
      :annotate-slot="annotateSlot"
      @close="close"
    >
      <template #description>
        <CmsRichText
          :value="node.props.description"
          tag="div"
          class="flex flex-col gap-3 [&_a]:underline [&_li]:ml-6 [&_li]:list-disc"
          v-bind="annotate('description')"
        />
      </template>
      <template #technologies>
        <CmsSlot name="technologies" annotated />
      </template>
    </ProjectDetailCard>

    <ProjectCard
      v-else
      :title="text(node.props.title)"
      :lead-text="text(node.props.leadText)"
      technologies-slot="technologies"
      :annotate="annotate"
      :annotate-slot="annotateSlot"
      @select="open"
    >
      <template #technologies>
        <CmsSlot name="technologies" annotated />
      </template>
    </ProjectCard>
  </div>
</template>

<script setup lang="ts">
import { type BlockProps, CmsRichText, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectDetailCard from '~/components/projects/ProjectDetailCard.vue'
import { isMobile } from '~/utils/isMobile'
import { text } from '~/utils/blockProps'
import { GALLERY_KEY } from './gallery.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()
const gallery = inject(GALLERY_KEY, undefined)

const selected = ref(false)
const editing = computed(() => isEditMode(props.context))
const expanded = computed(() => selected.value || editing.value)
const overlaid = computed(() => selected.value && isMobile.value && !editing.value)

const anchor = computed(() => text(props.node.props.anchor) || props.node.sourceNodeId)

const technologies = computed(() =>
  (props.node.slots?.technologies ?? []).map((tag) => text(tag.props.label)).filter((label) => label.length > 0),
)

const visible = computed(() => {
  const filter = gallery?.selected.value ?? []
  return editing.value || filter.length === 0 || filter.some((name) => technologies.value.includes(name))
})

const locked = useScrollLock(typeof document === 'undefined' ? null : document.body)

const open = (): void => {
  selected.value = true
}

const close = (): void => {
  selected.value = false
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', window.location.pathname)
  }
}

const onPopState = (event: PopStateEvent): void => {
  if (event.state === null || !event.state.projectEntry) {
    selected.value = false
  }
}

watch(overlaid, (isOverlaid) => {
  locked.value = isOverlaid
  if (isOverlaid) {
    window.history.pushState({ projectEntry: true }, '')
  }
})

onMounted(() => {
  window.addEventListener('popstate', onPopState)
  if (window.location.hash.slice(1) === anchor.value) {
    selected.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('popstate', onPopState)
  locked.value = false
})
</script>
