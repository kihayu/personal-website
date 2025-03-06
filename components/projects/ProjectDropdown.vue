<template>
  <div class="font-title relative mb-4 w-full" @keydown="handleKeyDown" ref="dropdownRef">
    <div
      class="flex h-fit w-full cursor-pointer items-center justify-between rounded-t-lg border-neutral-400 p-3 text-white"
      :class="{ 'border-x border-t': isOpen, 'rounded-b-lg border': !isOpen }"
      @click="toggleDropdown"
    >
      <div class="flex w-full flex-wrap gap-2">
        <div v-for="selected in selectedItems" :key="selected" class="flex items-center rounded bg-neutral-600 text-sm">
          <span class="font-title py-1 pl-2">{{ selected }}</span>
          <button class="px-1.5 py-1 text-xs hover:bg-neutral-500" @click.stop="toggleItem(selected)">×</button>
        </div>
        <div class="min-w-[100px] flex-1">
          <input
            ref="searchInput"
            v-model="searchTerm"
            type="text"
            class="placeholder:font-title w-full border-none bg-transparent p-0 outline-none placeholder:select-none"
            placeholder="Select technologies..."
            @focus="isOpen = true"
            @click.stop
          />
        </div>
      </div>
      <div class="ml-2">
        <ChevronDownIcon class="h-4 w-4 text-white" :class="{ 'rotate-180 transform': isOpen }" />
      </div>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-10 max-h-60 w-full overflow-y-auto rounded-b-lg border border-neutral-400 bg-stone-800 p-2 shadow-lg"
      ref="dropdownListRef"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="item"
        :ref="
          (el) => {
            if (el) {
              itemRefs[index] = el as HTMLElement
            }
          }
        "
        class="item-wrapper"
      >
        <ProjectDropdownElement :label="item" :is-selected="selectedItems.includes(item)" @select="toggleItem" />
      </div>
      <div v-if="filteredItems.length === 0" class="p-2 text-white">No matching technologies found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ProjectDropdownElement from '~/components/projects/ProjectDropdownElement.vue'
import ChevronDownIcon from '~/assets/icons/heroicons/chevron-down.svg'

export interface ProjectDropdownProps {
  readonly items: readonly string[]
  readonly modelValue: readonly string[]
}

export interface ProjectDropdownEmits {
  'update:modelValue': [value: string[]]
}

const props = defineProps<ProjectDropdownProps>()
const emit = defineEmits<ProjectDropdownEmits>()

const isOpen = ref(false)
const searchTerm = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const selectedItems = ref<Array<string>>([...props.modelValue])
const activeIndex = ref(-1)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownListRef = ref<HTMLElement | null>(null)
const itemRefs = ref<Array<HTMLElement>>([])

const filteredItems = computed((): string[] => {
  if (!searchTerm.value) return props.items as string[]
  return props.items.filter((item) => item.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })
  }
}

const closeDropdown = (): void => {
  isOpen.value = false
  activeIndex.value = -1
}

const toggleItem = (item: string): void => {
  const index = selectedItems.value.indexOf(item)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
  emit('update:modelValue', selectedItems.value)
}

const updateActiveIndex = (direction: 'next' | 'prev'): void => {
  const totalItems = filteredItems.value.length
  if (totalItems === 0) {
    return
  }

  if (direction === 'next') {
    activeIndex.value = (activeIndex.value + 1) % totalItems
  } else {
    activeIndex.value = activeIndex.value <= 0 ? totalItems - 1 : activeIndex.value - 1
  }
  focusElement()
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isOpen.value) {
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      updateActiveIndex('next')
      break
    case 'ArrowUp':
      event.preventDefault()
      updateActiveIndex('prev')
      break
    case 'Tab':
      event.preventDefault()
      event.shiftKey ? updateActiveIndex('prev') : updateActiveIndex('next')
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      if (searchInput.value) {
        searchInput.value.blur()
      }
      break
  }
}

const focusElement = (): void => {
  nextTick(() => {
    itemRefs.value = itemRefs.value.filter(Boolean)

    if (activeIndex.value >= 0 && activeIndex.value < itemRefs.value.length) {
      const elementToFocus = itemRefs.value[activeIndex.value].querySelector('div[tabindex="0"]') as HTMLElement
      if (elementToFocus) {
        elementToFocus.focus()
      }
    }
  })
}

watch(
  () => props.modelValue,
  (newVal) => {
    selectedItems.value = [...newVal]
  },
)

watch(
  () => filteredItems.value,
  () => {
    itemRefs.value = []
  },
)

onClickOutside(dropdownRef, () => {
  closeDropdown()
})
</script>
