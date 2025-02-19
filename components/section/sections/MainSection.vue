<template>
  <SectionComponent>
    <div class="grid h-full grid-cols-[auto_1fr] grid-rows-1 items-center">
      <div class="flex flex-col gap-8" @mouseleave="hoveredSection = ''">
        <ReactiveText name="design" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
          Design Section
        </ReactiveText>
        <ReactiveText name="develop" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
          Develop Section
        </ReactiveText>
        <ReactiveText name="deploy" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
          Deploy Section
        </ReactiveText>
      </div>
      <MainContentBox
        class="hidden max-w-[960px] transition-all duration-300 ease-in-out lg:block lg:w-[85%] 2xl:w-[55%]"
        :class="mainContentBoxClasses"
      >
        <TypeWriter
          v-if="hoveredSection === 'develop'"
          class="code-box animate-fadein opacity-0 duration-100 ease-in-out"
          :class="{ 'opacity-100': hoveredSection === 'develop' }"
          :auto-start="hoveredSection === 'develop'"
          :code="codeData"
          :delay="45"
          :auto-fill="watchedAnimations.develop"
        />
      </MainContentBox>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import MainContentBox from '~/components/MainContentBox.vue'
import ReactiveText from '~/components/atoms/main-section/ReactiveText.vue'
import TypeWriter from '~/components/atoms/TypeWriter.vue'

// Handle hover over reactive text

const hoveredOverSection = ref(false)
const hoveredSection = ref('')

const watchedAnimations = ref({
  develop: false,
  design: false,
  deploy: false,
})

const mainContentBoxClasses = computed(() => {
  let classes = ''

  if (hoveredSection.value === '') {
    classes = 'opacity-0 scale-0'
  } else {
    classes = 'opacity-100 scale-100'
  }
  return classes
})

const setHoveredSection = async (name: string) => {
  hoveredOverSection.value = true
  hoveredSection.value = name
  await new Promise((resolve) => setTimeout(resolve, 350))
  watchedAnimations.value[name as keyof typeof watchedAnimations.value] = true
}

const resetHoveredSection = async () => {
  hoveredOverSection.value = false
  await new Promise((resolve) => setTimeout(resolve, 350))

  if (!hoveredOverSection.value) {
    hoveredSection.value = ''
  }
}

const codeData = ref(`class Greeter {
  private greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  public greet(): string {
    return this.greeting
  }
}
`)
</script>
