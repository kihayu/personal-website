<template>
  <header class="flex h-full w-full flex-col items-center rounded-md bg-stone-800 p-4 shadow-md" v-bind="annotate()">
    <CmsImage
      v-if="photo !== undefined"
      :image="photo"
      :widths="schema.breakpoints"
      sizes="128px"
      loading="eager"
      class="h-32 w-32 rounded-full object-cover"
      v-bind="annotate('photo')"
    />
    <h1 class="font-title mt-2 text-3xl font-semibold" v-bind="annotate('name')">{{ node.props.name }}</h1>
    <p class="font-subtitle mt-2 text-center text-base text-neutral-300">
      <span v-if="hasText(node.props.role)" v-bind="annotate('role')">{{ node.props.role }}</span>
      <br v-if="hasText(node.props.role) && hasText(node.props.location)" />
      <span v-if="hasText(node.props.location)" v-bind="annotate('location')">{{ node.props.location }}</span>
    </p>
    <nav class="mt-12 flex items-center justify-center gap-6" aria-label="Profile links" v-bind="annotateSlot('links')">
      <CmsSlot name="links" annotated />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { type BlockProps, CmsImage, CmsSlot, hasText, useAnnotate, useAnnotateSlot } from '@cms/adapter-vue'
import { isAssetRef } from '@cms/content-model'
import { computed } from 'vue'
import schema from './ProfileCard.schema.ts'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()
const annotateSlot = useAnnotateSlot()

const photo = computed(() => (isAssetRef(props.node.props.photo) ? props.node.props.photo : undefined))
</script>
