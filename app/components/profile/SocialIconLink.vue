<template>
  <a
    :href="href"
    :rel="rel"
    :target="external ? '_blank' : undefined"
    :aria-label="label"
    class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
  >
    <GitHubIcon v-if="icon === 'github'" :class="brandIconClasses" role="img" aria-hidden="true" />
    <LinkedInIcon v-else-if="icon === 'linkedin'" :class="brandIconClasses" role="img" aria-hidden="true" />
    <MailIcon v-else-if="icon === 'mail'" color="white" :size="32" :class="iconClasses" role="img" aria-hidden="true" />
    <LinkIcon v-else color="white" :size="32" :class="iconClasses" role="img" aria-hidden="true" />
  </a>
</template>

<script setup lang="ts">
import GitHubIcon from '~/assets/icons/brands/github.svg'
import LinkedInIcon from '~/assets/icons/brands/linkedin.svg'
import { Link as LinkIcon, Mail as MailIcon } from '@lucide/vue'

export type SocialIcon = 'github' | 'linkedin' | 'mail' | 'link'

export interface SocialIconLinkProps {
  href: string
  label?: string
  icon?: SocialIcon
  external?: boolean
  rel?: string
}

withDefaults(defineProps<SocialIconLinkProps>(), {
  label: undefined,
  icon: 'link',
  external: false,
  rel: undefined,
})

const iconClasses = 'transition-transform duration-150 ease-out group-hover:scale-110'
const brandIconClasses = `w-8 fill-white ${iconClasses}`
</script>
