<template>
  <a
    v-if="link !== undefined"
    :href="link.href"
    :rel="rel"
    :target="external ? '_blank' : undefined"
    :aria-label="label"
    class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
    v-bind="annotate()"
  >
    <GitHubIcon
      v-if="icon === 'github'"
      class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
      role="img"
      aria-hidden="true"
    />
    <LinkedInIcon
      v-else-if="icon === 'linkedin'"
      class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
      role="img"
      aria-hidden="true"
    />
    <MailIcon
      v-else-if="icon === 'mail'"
      color="white"
      :size="32"
      class="transition-transform duration-150 ease-out group-hover:scale-110"
      role="img"
      aria-hidden="true"
    />
    <LinkIcon
      v-else
      color="white"
      :size="32"
      class="transition-transform duration-150 ease-out group-hover:scale-110"
      role="img"
      aria-hidden="true"
    />
  </a>
</template>

<script setup lang="ts">
import { type BlockProps, useAnnotate } from '@cms/adapter-vue'
import { isLinkRef } from '@cms/content-model'
import { computed } from 'vue'
import GitHubIcon from '~/assets/icons/brands/github.svg'
import LinkedInIcon from '~/assets/icons/brands/linkedin.svg'
import { Link as LinkIcon, Mail as MailIcon } from '@lucide/vue'

const props = defineProps<BlockProps>()
const annotate = useAnnotate()

const link = computed(() =>
  isLinkRef(props.node.props.href) ? props.context.resolveLink(props.node.props.href) : undefined,
)
const icon = computed(() => (typeof props.node.props.icon === 'string' ? props.node.props.icon : 'link'))
const label = computed(() => (typeof props.node.props.label === 'string' ? props.node.props.label : undefined))
const external = computed(() => link.value !== undefined && /^https?:/i.test(link.value.href))
const rel = computed(() => {
  const declared = link.value?.rel ?? []
  const parts = external.value ? [...new Set([...declared, 'noopener', 'noreferrer'])] : declared
  return parts.length > 0 ? parts.join(' ') : undefined
})
</script>
