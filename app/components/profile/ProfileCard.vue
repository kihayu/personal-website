<template>
  <header class="flex h-full w-full flex-col items-center rounded-md bg-stone-800 p-4 shadow-md" v-bind="annotate()">
    <CmsImage
      v-if="photo !== undefined"
      :image="photo"
      :widths="widths"
      sizes="128px"
      loading="eager"
      class="h-32 w-32 rounded-full object-cover"
      v-bind="annotate('photo')"
    />
    <h1 class="font-title mt-2 text-3xl font-semibold" v-bind="annotate('name')">{{ name }}</h1>
    <p class="font-subtitle mt-2 text-center text-base text-neutral-300">
      <span v-if="role" v-bind="annotate('role')">{{ role }}</span>
      <br v-if="role && location" />
      <span v-if="location" v-bind="annotate('location')">{{ location }}</span>
    </p>
    <nav class="mt-12 flex items-center justify-center gap-6" aria-label="Profile links" v-bind="annotateSlot('links')">
      <slot name="links" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { CmsImage } from '@cms/adapter-vue'
import type { AssetRef } from '@cms/content-model'

export interface ProfileCardProps {
  name: string
  role?: string
  location?: string
  photo?: AssetRef
  widths?: ReadonlyArray<number>
  annotate?: (field?: string) => Record<string, string>
  annotateSlot?: (slot: string) => Record<string, string>
}

withDefaults(defineProps<ProfileCardProps>(), {
  role: '',
  location: '',
  photo: undefined,
  widths: undefined,
  annotate: () => ({}),
  annotateSlot: () => ({}),
})
</script>
