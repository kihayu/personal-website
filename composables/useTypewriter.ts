interface TypewriterOptions {
  text: string
  delay?: number
  cursorBlinkSpeed?: number
  autoFill?: boolean
}

export const useTypewriter = () => {
  const typedText = ref('')
  const isTyping = ref(false)
  const showCursor = ref(true)
  let cursorInterval: NodeJS.Timer | number | null = null
  let typeInterval: NodeJS.Timer | number | null = null

  const startTyping = async ({ text, delay = 50, cursorBlinkSpeed = 530, autoFill = false }: TypewriterOptions) => {
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

    cursorInterval = setInterval(() => {
      showCursor.value = !showCursor.value
    }, cursorBlinkSpeed)

    return new Promise<void>((resolve) => {
      typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          typedText.value += text[currentIndex]
          currentIndex++
        } else {
          if (typeInterval) {
            clearInterval(typeInterval as number)
          }
          resolve()
        }
      }, delay)
    })
  }

  const stopTyping = () => {
    isTyping.value = false
    // if (cursorInterval) {
    //   clearInterval(cursorInterval as number)
    // }

    if (typeInterval) {
      clearInterval(typeInterval as number)
    }
  }

  onUnmounted(() => {
    stopTyping()
  })

  return {
    typedText,
    isTyping,
    showCursor,
    startTyping,
    stopTyping,
  }
}
