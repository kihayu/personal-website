<template>
  <div class="flex w-full justify-center border-b border-neutral-400 py-4 last:border-none lg:border-none">
    <h3
      class="font-title reactive-text relative inline-block w-fit text-3xl font-bold transition duration-300 select-none before:absolute before:-left-12 before:opacity-0 before:transition-all before:duration-300 before:content-['→'] hover:translate-x-3 hover:cursor-pointer hover:before:opacity-100 lg:text-4xl"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
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
