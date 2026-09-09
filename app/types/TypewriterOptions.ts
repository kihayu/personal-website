export interface TypewriterOptions {
  text: string
  delay?: number
  cursorBlinkSpeed?: number
  autoFill?: boolean
  onComplete?: () => void
}
