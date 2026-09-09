import type { InjectionKey, Ref } from 'vue'
import type { CodeSample } from '~/types/CodeSample'

export interface ShowcaseTopic {
  readonly id: string
  readonly label: string
  readonly animation: string
  readonly samples: readonly CodeSample[]
}

export interface Showcase {
  readonly hovered: Ref<ShowcaseTopic | undefined>
  watched(id: string): boolean
  hover(topic: ShowcaseTopic): void
  leave(): void
}

export const SHOWCASE_KEY: InjectionKey<Showcase> = Symbol('skill-showcase')
