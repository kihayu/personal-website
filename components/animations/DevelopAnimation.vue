<template>
  <div class="relative h-full w-full" role="region" aria-label="Development Animation Display">
    <div class="relative w-fit font-mono">
      <div ref="codeContainer" class="relative">
        <Shiki
          tabindex="-1"
          ref="shiki"
          :lang="lang"
          :code="typedText"
          class="w-fit [&_code]:!bg-transparent [&_code]:!select-none [&_pre]:!bg-transparent"
          :class="fontSize"
          v-bind="$attrs"
        />
        <span
          v-show="showCursor"
          ref="cursor"
          class="absolute inline-block w-0.5 bg-white transition-opacity duration-100"
          :class="{ 'opacity-0': !showCursor }"
          :style="cursorStyle"
        />
      </div>
    </div>
    <button
      v-if="showPauseButton"
      class="absolute right-0 bottom-0 h-12 w-12 cursor-pointer rounded-3xl bg-[rgba(255,255,255,0.2)]"
      :aria-label="isPaused ? 'Play animation' : 'Pause animation'"
      tabindex="0"
      @keydown.enter="isPaused ? pickNewRandomCode() : stopTyping(true, true)"
      @keydown.space.prevent="isPaused ? pickNewRandomCode() : stopTyping(true, true)"
      @click="isPaused ? pickNewRandomCode() : stopTyping(true, true)"
    >
      <PlayIcon v-if="isPaused" color="white" class="mx-auto my-auto" />
      <PauseIcon v-else color="white" class="mx-auto my-auto" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { codeExamples } from '~/constants/codeExamples'
import { type BundledLanguage } from 'shiki'
import { type CSSProperties } from 'vue'
import { Pause as PauseIcon } from 'lucide-vue-next'
import { Play as PlayIcon } from 'lucide-vue-next'

export interface DevelopAnimationProps {
  lang?: BundledLanguage | undefined
  autoStart?: boolean
  delay?: number
  cursorBlinkSpeed?: number
  autoFill?: boolean
  fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg'
  greetingCode?: boolean
  loop?: boolean
  showPauseButton?: boolean
}

const props = withDefaults(defineProps<DevelopAnimationProps>(), {
  lang: 'typescript',
  autoStart: true,
  delay: 50,
  cursorBlinkSpeed: 530,
  autoFill: false,
  fontSize: 'text-lg',
  greetingCode: true,
  loop: false,
  showPauseButton: false,
})

const codeContainer: Ref<ComponentPublicInstance<HTMLDivElement> | null> = ref(null)
const shiki: Ref<ComponentPublicInstance<HTMLDivElement> | null> = ref(null)
const cursor: Ref<ComponentPublicInstance<HTMLSpanElement> | null> = ref(null)
const cursorPosition = reactive({
  top: '0px',
  left: '0px',
  height: '1.2em',
})

const cursorStyle = computed<CSSProperties>(() => ({
  top: cursorPosition.top,
  left: cursorPosition.left,
  height: cursorPosition.height,
}))

const updateCursorPosition = () => {
  if (!shiki.value || !cursor.value) {
    return
  }
  if (!shiki.value.$el) {
    return
  }

  const codeElement = shiki.value.$el.getElementsByTagName('code')[0]
  if (codeElement) {
    codeElement.tabIndex = -1
  }

  const lines: NodeListOf<HTMLSpanElement> = shiki.value.$el.querySelectorAll('.line')
  const text = typedText.value
  const lastLineIndex = text.split('\n').length - 1
  const lastLine = lines[lastLineIndex]

  if (lastLine) {
    const lineRect = lastLine.getBoundingClientRect()
    const containerRect = shiki.value.$el.getBoundingClientRect()
    const spans = Array.from(lastLine.querySelectorAll('span'))
    const lastSpan = spans[spans.length - 1]
    const top = lineRect.top - containerRect.top
    const left = lastSpan ? `${lastSpan.getBoundingClientRect().right - containerRect.left}px` : '0px'
    if (top === 0 && left === '0px') {
      return
    }

    const height = `${lineRect.height}px`

    cursorPosition.top = `${top}px`
    cursorPosition.left = left
    cursorPosition.height = height
  }
}

const { typedText, showCursor, startTyping, isTyping, isPaused, stopTyping } = useTypewriter()

watch(typedText, () => {
  nextTick(updateCursorPosition)
})

const codeSamples: Ref<Array<string>> = ref(codeExamples)
const randomIndex = (): number => Math.floor(Math.random() * codeSamples.value.length)

const code: Ref<string> = ref(props.greetingCode ? codeSamples.value[0] : codeSamples.value[randomIndex()])

const pickNewRandomCode = async () => {
  if (props.greetingCode) {
    return
  }

  const newIndex = randomIndex()
  code.value = codeSamples.value[newIndex]
  await startTyping({
    text: code.value,
    delay: props.delay,
    cursorBlinkSpeed: props.cursorBlinkSpeed,
    onComplete: () => {
      if (props.loop) {
        setTimeout(async () => {
          await pickNewRandomCode()
        }, 2000)
      }
    },
  })
}

onMounted(async () => {
  if (props.autoFill) {
    startTyping({ text: code.value, autoFill: true })
    return
  }

  if (!props.autoStart) {
    return
  }

  await startTyping({
    text: code.value,
    delay: props.delay,
    cursorBlinkSpeed: props.cursorBlinkSpeed,
    onComplete: () => {
      if (props.loop) {
        setTimeout(async () => {
          await pickNewRandomCode()
        }, 2000)
      }
    },
  })
})

watch(
  () => code.value,
  async (newCode) => {
    await startTyping({
      text: newCode,
      delay: props.delay,
      cursorBlinkSpeed: props.cursorBlinkSpeed,
    })
  },
)
</script>
