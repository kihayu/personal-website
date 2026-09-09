<template>
  <section ref="root" class="relative flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md" v-bind="annotate()">
    <h2 v-if="hasText(node.props.heading)" class="font-title mb-6 text-3xl font-semibold" v-bind="annotate('heading')">
      {{ node.props.heading }}
    </h2>

    <ProjectDropdown
      v-if="technologies.length > 0"
      v-model="selectedTechnologies"
      class="pb-4"
      :items="technologies"
      :label="filterLabel"
      :placeholder="filterPlaceholder"
    />

    <div class="flex flex-col gap-y-4" v-bind="annotateSlot('items')">
      <CmsSlot name="items" annotated />
    </div>

    <button
      v-if="showScrollHint"
      type="button"
      class="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center opacity-100 transition-opacity duration-300"
      @click="scrollHere"
    >
      <span class="font-semibold text-white" v-bind="annotate('scrollHint')">{{ node.props.scrollHint }}</span>
      <ChevronsDownIcon class="h-6 w-6 text-white" aria-hidden="true" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, hasText, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, onMounted, provide, ref } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ChevronsDown as ChevronsDownIcon } from '@lucide/vue'
import ProjectDropdown from '~/components/projects/ProjectDropdown.vue'
import { isMobile } from '~/utils/isMobile'
import { GALLERY_KEY } from './gallery.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const MIN_HEIGHT_FOR_HINT = 1030

const root = ref<HTMLElement | null>(null)
const mounted = ref(false)
const scrolling = ref(false)
const passed = ref(false)
const selectedTechnologies = ref<Array<string>>([])
const editing = computed(() => isEditMode(props.context))

const { y: scrollY } = useWindowScroll()
const { height: windowHeight } = useWindowSize()

const filterLabel = computed(() =>
  typeof props.node.props.filterLabel === 'string' && props.node.props.filterLabel.length > 0
    ? props.node.props.filterLabel
    : 'Technologies',
)
const filterPlaceholder = computed(() =>
  typeof props.node.props.filterPlaceholder === 'string' && props.node.props.filterPlaceholder.length > 0
    ? props.node.props.filterPlaceholder
    : 'Select or search...',
)

const technologies = computed(() => {
  const names = new Set<string>()
  for (const project of props.node.slots?.items ?? []) {
    for (const tag of project.slots?.technologies ?? []) {
      if (typeof tag.props.label === 'string' && tag.props.label.trim().length > 0) {
        names.add(tag.props.label)
      }
    }
  }
  return [...names].sort()
})

const showScrollHint = computed(
  () =>
    mounted.value &&
    !editing.value &&
    hasText(props.node.props.scrollHint) &&
    !isMobile.value &&
    !scrolling.value &&
    !passed.value &&
    windowHeight.value >= MIN_HEIGHT_FOR_HINT &&
    scrollY.value <= windowHeight.value / 10,
)

const scrollHere = (): void => {
  if (root.value === null) {
    return
  }
  scrolling.value = true
  passed.value = true
  root.value.scrollIntoView({ behavior: 'smooth' })
  setTimeout(() => {
    scrolling.value = false
  }, 1000)
}

onMounted(() => {
  mounted.value = true
})

provide(GALLERY_KEY, { selected: selectedTechnologies })
</script>
