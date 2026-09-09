<template>
  <article
    v-show="visible"
    :id="anchor"
    class="text-white no-underline"
    :class="
      overlaid
        ? 'fixed inset-0 z-50 flex min-h-fit flex-col gap-y-6 overflow-y-auto bg-stone-800 p-6'
        : 'project-card relative flex min-h-fit flex-col rounded-lg border border-neutral-400 p-4 transition-all duration-300 hover:[&_.link-arrows]:scale-120'
    "
    v-bind="annotate()"
  >
    <div
      class="flex justify-between"
      :class="expanded ? '' : 'cursor-pointer active:scale-[0.98] lg:active:scale-100'"
      :role="expanded ? undefined : 'button'"
      :tabindex="expanded ? undefined : 0"
      :aria-label="expanded ? undefined : `View details for ${title} project`"
      @click="expanded ? undefined : open()"
      @keydown.enter="expanded ? undefined : open()"
      @keydown.space.prevent="expanded ? undefined : open()"
    >
      <div class="flex flex-col gap-x-4">
        <h2 class="font-title font-bold" :class="expanded ? 'text-3xl' : 'text-2xl'" v-bind="annotate('title')">
          {{ node.props.title }}
        </h2>
        <span
          v-if="expanded && hasText(node.props.capacity)"
          class="font-title text-lg text-neutral-400"
          v-bind="annotate('capacity')"
        >
          {{ node.props.capacity }}
        </span>
      </div>
      <button
        v-if="expanded && !editing"
        class="flex h-fit translate-y-1 cursor-pointer justify-center text-neutral-400 transition-all duration-300 lg:hover:scale-125 lg:active:scale-110"
        aria-label="Close project details"
        @click.stop="close"
      >
        <XIcon class="h-7 w-7 translate-y-0.25" :stroke-width="2.5" />
      </button>
    </div>

    <p
      v-if="!expanded || editing"
      class="font-paragraph flex-1 text-lg"
      :class="{ 'mt-2': expanded }"
      v-bind="annotate('leadText')"
    >
      {{ node.props.leadText }}
    </p>

    <CmsRichText
      v-if="expanded"
      :value="node.props.description"
      tag="div"
      class="font-paragraph flex h-full w-full flex-col gap-3 border-b border-neutral-600 pb-4 text-lg [&_a]:underline [&_li]:ml-6 [&_li]:list-disc"
      v-bind="annotate('description')"
    />

    <div class="mt-6 flex justify-between" :class="{ 'mt-0': expanded }">
      <div class="flex flex-row flex-wrap gap-2" v-bind="annotateSlot('technologies')">
        <CmsSlot name="technologies" annotated />
      </div>
      <div v-if="!expanded" class="link-arrows self-end select-none">
        <ChevronsRightIcon class="link-arrows transition duration-150" aria-hidden="true" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { type BlockProps, CmsRichText, CmsSlot, hasText, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { ChevronsRight as ChevronsRightIcon, XIcon } from '@lucide/vue'
import { isMobile } from '~/utils/isMobile'
import { GALLERY_KEY } from './gallery.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()
const gallery = inject(GALLERY_KEY, undefined)

const selected = ref(false)
const editing = computed(() => isEditMode(props.context))
const expanded = computed(() => selected.value || editing.value)
const overlaid = computed(() => selected.value && isMobile.value && !editing.value)

const title = computed(() => (typeof props.node.props.title === 'string' ? props.node.props.title : ''))
const anchor = computed(() =>
  typeof props.node.props.anchor === 'string' && props.node.props.anchor.length > 0
    ? props.node.props.anchor
    : props.node.sourceNodeId,
)

const technologies = computed(() =>
  (props.node.slots?.technologies ?? [])
    .map((tag) => tag.props.label)
    .filter((label): label is string => typeof label === 'string'),
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
