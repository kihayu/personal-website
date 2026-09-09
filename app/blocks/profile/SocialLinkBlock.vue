<template>
  <SocialIconLink
    v-if="link !== undefined"
    :href="link.href"
    :label="text(node.props.label)"
    :icon="icon"
    :external="external"
    :rel="rel"
    v-bind="annotate()"
  />
</template>

<script setup lang="ts">
import { type BlockProps, useAnnotate } from '@cms/adapter-vue'
import { isLinkRef } from '@cms/content-model'
import { computed } from 'vue'
import SocialIconLink, { type SocialIcon } from '~/components/profile/SocialIconLink.vue'
import { text } from '~/utils/blockProps'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()

const ICONS: ReadonlyArray<SocialIcon> = ['github', 'linkedin', 'mail', 'link']

const link = computed(() =>
  isLinkRef(props.node.props.href) ? props.context.resolveLink(props.node.props.href) : undefined,
)
const icon = computed<SocialIcon>(() => ICONS.find((known) => known === props.node.props.icon) ?? 'link')
const external = computed(() => link.value !== undefined && /^https?:/i.test(link.value.href))
const rel = computed(() => {
  const declared = link.value?.rel ?? []
  const parts = external.value ? [...new Set([...declared, 'noopener', 'noreferrer'])] : declared
  return parts.length > 0 ? parts.join(' ') : undefined
})
</script>
