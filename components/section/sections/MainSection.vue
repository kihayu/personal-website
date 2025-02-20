<template>
  <SectionComponent>
    <div class="grid h-full grid-cols-[auto_1fr] grid-rows-1 items-center gap-x-16">
      <div class="flex flex-col gap-8" @mouseleave="resetHoveredSection(false)">
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
        class="hidden w-0 max-w-[960px] transition-all duration-300 ease-in-out lg:block lg:w-[65%]"
        :class="mainContentBoxClasses"
      >
        <template v-if="hoveredSection === 'design' || hoveredSection === 'develop' || hoveredSection === 'deploy'">
          <TypeWriter
            v-if="hoveredSection === 'develop'"
            class="code-box animate-fadein opacity-0 duration-100 ease-in-out"
            :class="{ 'opacity-100': hoveredSection === 'develop' }"
            :auto-start="hoveredSection === 'develop'"
            :code="codeData"
            :delay="45"
            :auto-fill="watchedAnimations.develop"
          />
          <FigmaAnimation
            v-if="hoveredSection === 'design'"
            class="animate-fadein opacity-0 duration-100 ease-in-out"
            :class="{ 'opacity-100': hoveredSection === 'design' }"
            :auto-start="hoveredSection === 'design'"
            :auto-fill="watchedAnimations.design"
          />
        </template>
      </MainContentBox>
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import MainContentBox from '~/components/MainContentBox.vue'
import ReactiveText from '~/components/main-section/ReactiveText.vue'
import TypeWriter from '~/components/main-section/TypeWriter.vue'
import FigmaAnimation from '~/components/main-section/FigmaAnimation.vue'

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

  if (hoveredSection.value === 'develop') {
    classes += ' lg:w-[85%] 2xl:w-[65%]'
  }

  if (!hoveredOverSection.value && hoveredSection.value === '') {
    classes += ' scale-0'
    return classes
  }

  classes += ' opacity-100 scale-100'

  return classes
})

const setHoveredSection = async (name: string) => {
  hoveredOverSection.value = true
  hoveredSection.value = name
  await new Promise((resolve) => setTimeout(resolve, 350))
  watchedAnimations.value[name as keyof typeof watchedAnimations.value] = true
}

const resetHoveredSection = async (withDelay = true) => {
  hoveredOverSection.value = false
  await new Promise((resolve) => setTimeout(resolve, withDelay ? 350 : 0))

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
