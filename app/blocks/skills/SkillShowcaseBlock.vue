<template>
  <section class="min-h-fit w-full rounded-md bg-stone-800 p-6 py-8 shadow-md" v-bind="annotate()">
    <MainContent
      :title="hovered?.label"
      :hint="text(node.props.hint)"
      :stacked="editing"
      slot-name="items"
      :annotate="annotate"
      :annotate-slot="annotateSlot"
      @leave="leave"
    >
      <template #topics>
        <CmsSlot name="items" annotated />
      </template>
      <template #preview>
        <SkillAnimation
          v-if="hovered !== undefined"
          :key="hovered.id"
          :kind="hovered.animation"
          :samples="hovered.samples"
          :auto-fill="watched(hovered.id)"
          class="animate-fadein opacity-100 duration-100 ease-in-out"
          font-size="text-sm"
        />
      </template>
    </MainContent>
  </section>
</template>

<script setup lang="ts">
import { type BlockProps, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, provide, ref } from 'vue'
import MainContent from '~/components/skills/MainContent.vue'
import SkillAnimation from '~/components/animations/SkillAnimation.vue'
import { text } from '~/utils/blockProps'
import { SHOWCASE_KEY, type ShowcaseTopic } from './showcase.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const HOVER_SETTLED_MS = 1000
const LEAVE_DELAY_MS = 750

const hovered = ref<ShowcaseTopic | undefined>(undefined)
const pointing = ref(false)
const seen = ref<Record<string, boolean>>({})

const editing = computed(() => isEditMode(props.context))

const hover = async (topic: ShowcaseTopic): Promise<void> => {
  pointing.value = true
  hovered.value = topic
  await new Promise((resolve) => setTimeout(resolve, HOVER_SETTLED_MS))
  if (!pointing.value) {
    return
  }
  seen.value = { ...seen.value, [topic.id]: true }
}

const leave = async (): Promise<void> => {
  pointing.value = false
  await new Promise((resolve) => setTimeout(resolve, LEAVE_DELAY_MS))
  if (!pointing.value) {
    hovered.value = undefined
  }
}

const watched = (id: string): boolean => seen.value[id] === true

provide(SHOWCASE_KEY, { hovered, hover, leave, watched })
</script>
