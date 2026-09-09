<template>
  <section ref="root" class="relative flex flex-col gap-y-4 rounded-md bg-stone-800 p-6 shadow-md" v-bind="annotate()">
    <h2 v-if="heading" class="font-title mb-6 text-3xl font-semibold" v-bind="annotate('heading')">{{ heading }}</h2>

    <ProjectDropdown
      v-if="technologies.length > 0"
      :model-value="[...selected]"
      class="pb-4"
      :items="[...technologies]"
      :label="filterLabel"
      :placeholder="filterPlaceholder"
      @update:model-value="emit('update:selected', $event)"
    />

    <div class="flex flex-col gap-y-4" v-bind="annotateSlot(slotName)">
      <slot />
    </div>

    <button
      v-if="showScrollHint"
      type="button"
      class="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center opacity-100 transition-opacity duration-300"
      @click="scrollHere"
    >
      <span class="font-semibold text-white" v-bind="annotate('scrollHint')">{{ scrollHint }}</span>
      <ChevronsDownIcon class="h-6 w-6 text-white" aria-hidden="true" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ChevronsDown as ChevronsDownIcon } from '@lucide/vue'
import ProjectDropdown from '~/components/projects/ProjectDropdown.vue'
import { isMobile } from '~/utils/isMobile'

export interface ProjectGalleryProps {
  heading?: string
  filterLabel?: string
  filterPlaceholder?: string
  scrollHint?: string
  technologies?: ReadonlyArray<string>
  selected?: ReadonlyArray<string>
  editing?: boolean
  slotName?: string
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

const props = withDefaults(defineProps<ProjectGalleryProps>(), {
  heading: '',
  filterLabel: 'Technologies',
  filterPlaceholder: 'Select or search...',
  scrollHint: '',
  technologies: () => [],
  selected: () => [],
  editing: false,
  slotName: 'items',
  annotate: () => ({}),
  annotateSlot: () => ({}),
})

export interface ProjectGalleryEmits {
  'update:selected': [value: string[]]
}

const emit = defineEmits<ProjectGalleryEmits>()

const MIN_HEIGHT_FOR_HINT = 1030

const root = ref<HTMLElement | null>(null)
const mounted = ref(false)
const scrolling = ref(false)
const passed = ref(false)

const { y: scrollY } = useWindowScroll()
const { height: windowHeight } = useWindowSize()

const showScrollHint = computed(
  () =>
    mounted.value &&
    !props.editing &&
    props.scrollHint.length > 0 &&
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
</script>
