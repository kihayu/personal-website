import type { TypewriterOptions } from '~/types/TypewriterOptions'

export const useTypewriter = () => {
  const typedText = ref('')
  const isPaused = ref(false)
  const isTyping = ref(false)
  const showCursor = ref(true)
  let cursorInterval: NodeJS.Timer | number | null = null
  let typeInterval: NodeJS.Timer | number | null = null

  const startTyping = async ({
    text,
    delay = 50,
    cursorBlinkSpeed = 530,
    autoFill = false,
    onComplete,
  }: TypewriterOptions) => {
    isPaused.value = false
    if (autoFill) {
      typedText.value = text
      showCursor.value = false
      return
    }

    if (isTyping.value) {
      return
    }

    typedText.value = ''
    isTyping.value = true
    showCursor.value = true
    let currentIndex = 0

    if (!cursorInterval) {
      cursorInterval = setInterval(() => {
        showCursor.value = !showCursor.value
      }, cursorBlinkSpeed)
    }

    return new Promise<void>((resolve) => {
      typeInterval = setInterval(() => {
        if (currentIndex < text.length && !isPaused.value) {
          typedText.value += text[currentIndex]
          currentIndex++
        } else {
          if (typeInterval) {
            clearInterval(typeInterval as number)
          }
          resolve()
          onComplete?.()
          stopTyping()
        }
      }, delay)
    })
  }

  const stopTyping = (stopCursor = false, pauseButton = false) => {
    isTyping.value = false
    if (pauseButton) {
      isPaused.value = true
    }
    if (stopCursor && cursorInterval) {
      clearInterval(cursorInterval as number)
      showCursor.value = false
    }

    if (typeInterval) {
      clearInterval(typeInterval as number)
    }
  }

  onUnmounted(() => {
    stopTyping(true)
  })

  return {
    typedText,
    isTyping,
    isPaused,
    showCursor,
    startTyping,
    stopTyping,
  }
}
