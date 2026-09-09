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

    <SkillTopicDialog v-if="open" :title="topic.label" @close="open = false">
      <div class="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-6 lg:grid-cols-2">
        <CmsRichText
          :value="node.props.body"
          tag="div"
          class="font-paragraph flex h-fit w-full flex-col gap-y-2 text-xl lg:h-full [&_a]:underline [&_li]:ml-6 [&_li]:list-disc [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mt-2 [&>p:first-child]:first-letter:pr-1 [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-10"
          v-bind="annotate('body')"
        />
        <div
          v-if="topic.animation !== 'none'"
          class="min-h-64 rounded-xl bg-stone-900 p-4 lg:block lg:h-full lg:min-w-1/2 xl:min-w-[45%]"
        >
          <SkillAnimation
            :kind="topic.animation"
            :samples="topic.samples"
            :font-size="isMobile ? 'text-xs' : 'text-sm'"
            loop
            show-pause-button
          />
        </div>
      </div>
    </SkillTopicDialog>

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
import ReactiveText from '~/components/ReactiveText.vue'
import SkillAnimation from '~/components/animations/SkillAnimation.vue'
import SkillTopicDialog from '~/components/skills/SkillTopicDialog.vue'
import { isMobile } from '~/utils/isMobile'
import { type CodeSample, isCodeSampleLanguage } from '~/types/CodeSample'
import { SHOWCASE_KEY, type ShowcaseTopic } from './showcase.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()
const showcase = inject(SHOWCASE_KEY, undefined)

const open = ref(false)
const editing = computed(() => isEditMode(props.context))

const samples = computed<Array<CodeSample>>(() =>
  (props.node.slots?.codeSamples ?? [])
    .map((child) => ({ language: child.props.language, code: child.props.code }))
    .filter((sample): sample is CodeSample => isCodeSampleLanguage(sample.language) && typeof sample.code === 'string'),
)

const topic = computed<ShowcaseTopic>(() => ({
  id: props.node.sourceNodeId,
  label: typeof props.node.props.label === 'string' ? props.node.props.label : '',
  animation: typeof props.node.props.animation === 'string' ? props.node.props.animation : 'none',
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
