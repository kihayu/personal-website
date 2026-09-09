<template>
  <div class="w-full" :class="{ 'lg:w-fit': !editing }" v-bind="annotate()">
    <ReactiveText
      :name="topic.id"
      role="button"
      :aria-label="`Read about ${topic.label}`"
      @mouseover="onPoint"
      @mouseleave="onLeave"
      @click="onSelect"
      @keydown.enter="onSelect"
      @keydown.space.prevent="onSelect"
    >
      <span v-bind="annotate('label')">{{ node.props.label }}</span>
    </ReactiveText>

    <MainContentInfo v-if="open" :title="topic.label" @close="open = false">
      <TopicInfo :animation="topic.animation" :samples="topic.samples">
        <CmsRichText :value="node.props.body" tag="div" :class="bodyClasses" v-bind="annotate('body')" />
      </TopicInfo>
    </MainContentInfo>

    <div v-if="editing" class="mt-4 w-full rounded-lg border border-dashed border-neutral-500 p-4">
      <p class="font-title mb-2 text-sm text-neutral-400">A visitor reads this after clicking the title.</p>
      <CmsRichText
        :value="node.props.body"
        tag="div"
        class="font-paragraph flex flex-col gap-2"
        v-bind="annotate('body')"
      />
      <div class="mt-4 flex flex-col gap-2" v-bind="annotateSlot('codeSamples')">
        <CmsSlot name="codeSamples" annotated />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BlockProps, CmsRichText, CmsSlot, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isEditMode } from '@cms/content-model'
import { computed, inject, ref } from 'vue'
import ReactiveText from '~/components/skills/ReactiveText.vue'
import MainContentInfo from '~/components/skills/MainContentInfo.vue'
import TopicInfo from '~/components/skills/TopicInfo.vue'
import { text } from '~/utils/blockProps'
import { type CodeSample, isCodeSampleLanguage } from '~/types/CodeSample'
import { SHOWCASE_KEY, type ShowcaseTopic } from './showcase.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()
const showcase = inject(SHOWCASE_KEY, undefined)

const open = ref(false)
const editing = computed(() => isEditMode(props.context))

const bodyClasses =
  'font-paragraph flex h-fit w-full flex-col gap-y-2 text-xl lg:h-full [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mt-2 [&>p:first-child]:first-letter:pr-1 [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-10 [&_a]:underline [&_li]:ml-6 [&_li]:list-disc'

const samples = computed<Array<CodeSample>>(() =>
  (props.node.slots?.codeSamples ?? [])
    .map((child) => ({ language: child.props.language, code: child.props.code }))
    .filter((sample): sample is CodeSample => isCodeSampleLanguage(sample.language) && typeof sample.code === 'string'),
)

const topic = computed<ShowcaseTopic>(() => ({
  id: props.node.sourceNodeId,
  label: text(props.node.props.label),
  animation: text(props.node.props.animation) || 'none',
  samples: samples.value,
}))

const onPoint = (): void => {
  showcase?.hover(topic.value)
}

const onLeave = (): void => {
  showcase?.leave()
}

const onSelect = (): void => {
  if (editing.value) {
    return
  }
  open.value = true
}
</script>
