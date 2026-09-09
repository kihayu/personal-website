import type { BundledLanguage } from 'shiki'

export const CODE_SAMPLE_LANGUAGES = ['typescript', 'javascript', 'vue', 'python', 'bash', 'json'] as const

export type CodeSampleLanguage = (typeof CODE_SAMPLE_LANGUAGES)[number]

export interface CodeSample {
  language: BundledLanguage
  code: string
}

export const isCodeSampleLanguage = (value: unknown): value is CodeSampleLanguage =>
  typeof value === 'string' && (CODE_SAMPLE_LANGUAGES as readonly string[]).includes(value)
