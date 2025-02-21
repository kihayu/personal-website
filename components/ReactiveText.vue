<template>
  <div
    class="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-400 bg-stone-800 p-4 transition-all duration-300 hover:border-neutral-200 active:scale-[0.98] active:bg-stone-700 lg:w-fit lg:border-none lg:bg-transparent lg:p-0 lg:active:scale-100 lg:active:bg-transparent"
  >
    <h3
      class="font-title text-2xl font-bold md:text-3xl xl:text-4xl"
      :class="{
        'lg:transition-transform lg:duration-300 lg:group-hover:translate-x-3': !isMobile,
      }"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focusin="onMouseEnter"
      @focusout="onMouseLeave"
      role="button"
      tabindex="0"
    >
      <slot />
    </h3>
    <span
      class="text-2xl text-neutral-400 transition-all duration-300 group-hover:text-neutral-200 lg:absolute lg:-translate-x-9 lg:text-3xl lg:opacity-0 lg:group-hover:-translate-x-6 lg:group-hover:opacity-100"
    >
      →
    </span>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '~/utils/isMobile'

export interface ReactiveTextProps {
  name: string
}

const props = defineProps<ReactiveTextProps>()

const emit = defineEmits(['mouseover', 'mouseleave'])

const onMouseEnter = () => {
  emit('mouseover', props.name)
}

const onMouseLeave = async () => {
  emit('mouseleave', props.name)
}
</script>
