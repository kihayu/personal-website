<template>
  <DesignAnimation v-if="kind === 'design'" :auto-fill="autoFill" :loop="loop" :show-pause-button="showPauseButton" />
  <DevelopAnimation
    v-else-if="kind === 'development'"
    :font-size="fontSize"
    :auto-fill="autoFill"
    :loop="loop"
    :show-pause-button="showPauseButton"
    :samples="samples"
    :greeting-code="greetingCode"
    :delay="delay"
  />
  <DeployAnimation v-else-if="kind === 'deployment'" :auto-fill="autoFill" />
</template>

<script setup lang="ts">
import DesignAnimation from '~/components/animations/DesignAnimation.vue'
import DevelopAnimation from '~/components/animations/DevelopAnimation.vue'
import DeployAnimation from '~/components/animations/DeployAnimation.vue'
import type { CodeSample } from '~/types/CodeSample'

export interface SkillAnimationProps {
  kind: string
  fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg'
  autoFill?: boolean
  loop?: boolean
  showPauseButton?: boolean
  greetingCode?: boolean
  delay?: number
  samples?: ReadonlyArray<CodeSample>
}

withDefaults(defineProps<SkillAnimationProps>(), {
  fontSize: 'text-sm',
  autoFill: false,
  loop: false,
  showPauseButton: false,
  greetingCode: false,
  delay: 45,
  samples: undefined,
})
</script>
