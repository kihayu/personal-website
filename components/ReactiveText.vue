<template>
  <div class="flex w-full justify-center border-b border-neutral-400 py-4 last:border-none lg:border-none">
    <div class="group relative flex w-fit items-center gap-3 hover:cursor-pointer">
      <span
        class="absolute -translate-x-9 text-3xl opacity-0 transition-all duration-300 group-hover:-translate-x-6 group-hover:opacity-100"
      >
        →
      </span>
      <h3
        class="font-title reactive-text text-2xl font-bold transition-transform duration-300 group-hover:translate-x-3 md:text-3xl xl:text-4xl"
        @mouseover="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onMouseEnter"
        @focusout="onMouseLeave"
        role="button"
        tabindex="0"
      >
        <slot />
      </h3>
    </div>
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
