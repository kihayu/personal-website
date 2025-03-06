<template>
  <div class="font-title relative w-full" @keydown="handleKeyDown" ref="dropdownRef">
    <label for="technology-input">Technologies</label>
    <div
      class="mt-1 flex h-auto w-full cursor-pointer items-center justify-between rounded-t-lg border-neutral-400 p-3 text-white transition-all duration-200"
      :class="{ 'border-x border-t': isOpen, 'rounded-b-lg border': !isOpen }"
      @click="toggleDropdown"
    >
      <div class="flex w-full flex-wrap gap-2">
        <div v-for="selected in selectedItems" :key="selected" class="flex items-center rounded bg-neutral-600 text-sm">
          <span class="font-title cursor-default py-1 pl-2">{{ selected }}</span>
          <button
            class="cursor-pointer rounded-full px-1.5 py-1 text-xs hover:bg-neutral-500"
            @click.stop="toggleItem(selected)"
          >
            ×
          </button>
        </div>
        <div class="min-w-[80px]">
          <input
            ref="searchInput"
            v-model="searchTerm"
            id="technology-input"
            type="text"
            class="placeholder:font-title w-full cursor-pointer border-none bg-transparent p-0 outline-none placeholder:select-none"
            placeholder="Select or search..."
            @focus="isOpen = true"
            @click.stop
            @keydown="handleInputKeydown"
          />
        </div>
      </div>
      <div class="ml-2">
        <ChevronDownIcon class="transition-transform duration-200" :class="{ 'rotate-180 transform': isOpen }" />
      </div>
    </div>

    <div
      class="absolute max-h-60 w-full overflow-y-auto rounded-b-lg border border-neutral-400 bg-stone-800 p-2 shadow-2xl transition-opacity duration-300"
      :class="{ 'z-10 opacity-100': isOpen, 'opacity-0': !isOpen }"
      ref="dropdownListRef"
    >
      <template v-if="isOpen">
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
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ProjectDropdownElement from '~/components/projects/ProjectDropdownElement.vue'
import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next'

export interface ProjectDropdownProps {
  items: string[]
  modelValue: string[]
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
  searchTerm.value = ''
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
  // flutter

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

const handleInputKeydown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault()
      if (!searchTerm.value || filteredItems.value.length === 0) {
        return
      }

      toggleItem(filteredItems.value[0])
      break
    case 'Backspace':
      if (searchTerm.value || selectedItems.value.length === 0) {
        return
      }

      event.preventDefault()
      toggleItem(selectedItems.value[selectedItems.value.length - 1])
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

watch(
  () => isOpen.value,
  async (newValue) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (!newValue) {
      dropdownListRef.value?.classList.add('-z-10')
      return
    }

    dropdownListRef.value?.classList.remove('-z-10')
  },
)

onClickOutside(dropdownRef, () => {
  closeDropdown()
})
</script>
