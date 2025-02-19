<template>
  <div class="relative w-fit font-mono">
    <div ref="codeContainer" class="relative">
      <Shiki
        ref="shiki"
        :lang="lang"
        :code="typedText"
        class="w-fit text-lg [&_code]:!bg-transparent [&_pre]:!bg-transparent"
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
</template>

<script setup lang="ts">
import { type BundledLanguage } from 'shiki'
import { type CSSProperties } from 'vue'

interface TypeWriterProps {
  code: string
  lang?: BundledLanguage | undefined
  autoStart?: boolean
  delay?: number
  cursorBlinkSpeed?: number
  autoFill?: boolean
}

const props = withDefaults(defineProps<TypeWriterProps>(), {
  lang: 'typescript',
  autoStart: true,
  delay: 50,
  cursorBlinkSpeed: 530,
  autoFill: false,
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

const { typedText, showCursor, startTyping } = useTypewriter()

watch(typedText, () => {
  nextTick(updateCursorPosition)
})

onMounted(async () => {
  if (props.autoFill) {
    startTyping({ text: props.code, autoFill: true })
    return
  }

  if (!props.autoStart) {
    return
  }

  await startTyping({
    text: props.code,
    delay: props.delay,
    cursorBlinkSpeed: props.cursorBlinkSpeed,
  })
})

watch(
  () => props.code,
  async (newCode) => {
    await startTyping({
      text: newCode,
      delay: props.delay,
      cursorBlinkSpeed: props.cursorBlinkSpeed,
    })
  },
)
</script>
