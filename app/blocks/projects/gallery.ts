import type { InjectionKey, Ref } from 'vue'

export interface Gallery {
  readonly selected: Ref<readonly string[]>
}

export const GALLERY_KEY: InjectionKey<Gallery> = Symbol('project-gallery')
