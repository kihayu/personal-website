<template>
  <div
    class="flex cursor-pointer items-center p-2 hover:bg-neutral-700"
    :class="{ 'bg-neutral-700': isSelected }"
    tabindex="0"
    @click="toggleSelect"
    @keydown="handleKeyDown"
  >
    <div
      class="mr-3 flex h-5 w-5 items-center justify-center rounded border border-white transition duration-150 hover:bg-neutral-500"
      :class="{ 'bg-neutral-600': isSelected }"
    >
      <span v-if="isSelected" class="text-xs font-bold text-white">×</span>
    </div>
    <span class="text-white select-none">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
export interface ProjectDropdownElementProps {
  label: string
  isSelected: boolean
}

export interface ProjectDropdownElementEmits {
  select: [value: string]
}

const props = defineProps<ProjectDropdownElementProps>()
const emit = defineEmits<ProjectDropdownElementEmits>()

const toggleSelect = (): void => {
  emit('select', props.label)
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    toggleSelect()
  }
}
</script>
