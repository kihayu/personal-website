<template>
  <div class="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-6 lg:grid-cols-2">
    <div class="flex h-fit flex-col gap-y-2 lg:h-full">
      <slot />
    </div>
    <div
      v-if="animation !== 'none'"
      class="min-h-64 rounded-xl bg-stone-900 p-4 lg:block lg:h-full lg:min-w-1/2 xl:min-w-[45%]"
    >
      <SkillAnimation
        :kind="animation"
        :samples="samples"
        :font-size="isMobile ? 'text-xs' : 'text-sm'"
        loop
        show-pause-button
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillAnimation from '~/components/animations/SkillAnimation.vue'
import { isMobile } from '~/utils/isMobile'
import type { CodeSample } from '~/types/CodeSample'

export interface TopicInfoProps {
  animation?: string
  samples?: ReadonlyArray<CodeSample>
}

withDefaults(defineProps<TopicInfoProps>(), {
  animation: 'none',
  samples: undefined,
})
</script>
