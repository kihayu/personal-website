<template>
  <span
    class="reactive-text relative inline-block w-fit text-3xl font-bold transition duration-300 select-none before:absolute before:-left-12 before:opacity-0 before:transition-all before:duration-300 before:content-['→'] hover:translate-x-3 hover:cursor-pointer hover:before:opacity-100 xl:text-5xl"
    @mouseover="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </span>
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
