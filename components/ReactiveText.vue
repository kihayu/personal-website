<template>
  <div
    class="flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-400 bg-stone-800 p-4 transition-all duration-300 hover:border-neutral-200 active:scale-[0.98] active:bg-stone-700 lg:w-fit lg:border-none lg:bg-transparent lg:p-0 lg:active:scale-100 lg:active:bg-transparent"
  >
    <h3
      class="font-title text-2xl font-bold select-none md:text-3xl lg:transition-all lg:duration-150 lg:hover:text-neutral-400 lg:active:text-neutral-500 xl:text-4xl"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focusin="onMouseEnter"
      @focusout="onMouseLeave"
      tabindex="0"
    >
      <slot />
    </h3>
  </div>
</template>

<script setup lang="ts">
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
