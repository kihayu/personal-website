<template>
  <span
    class="relative inline-block w-fit select-none text-5xl font-bold transition duration-300 after:absolute after:-bottom-4 after:left-0 after:h-1 after:w-0 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:scale-110 hover:cursor-pointer hover:after:w-full xl:text-6xl"
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
