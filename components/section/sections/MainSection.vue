<template>
  <div class="">
    <SectionComponent class="gap-y-8">
      <div
        class="flex h-fit w-full flex-col justify-center gap-x-8 gap-y-8 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr]"
      >
        <ProfileCard />
        <AboutMeCard />
      </div>
      <div
        class="flex w-full flex-col items-center justify-center gap-x-16 gap-y-10 rounded-md bg-stone-800 p-6 py-4 pb-8"
      >
        <div
          class="flex w-full flex-col items-center justify-between lg:flex-row lg:px-[12.5%]"
          @mouseleave="resetHoveredSection(false)"
        >
          <ReactiveText name="design" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
            Design
          </ReactiveText>
          <ReactiveText name="develop" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
            Develop
          </ReactiveText>
          <ReactiveText name="deploy" @mouseover="setHoveredSection" @mouseleave="resetHoveredSection">
            Deploy
          </ReactiveText>
        </div>
        <MainContentBox class="mx-auto hidden lg:flex" :class="mainContentBoxClasses" :title="sectionToSectionName">
          <FigmaAnimation
            v-if="hoveredSection === 'design'"
            class="animate-fadein opacity-0 duration-100 ease-in-out"
            :class="{ 'opacity-100': hoveredSection === 'design' }"
            :auto-fill="watchedAnimations.design"
          />
          <TypeWriter
            v-if="hoveredSection === 'develop'"
            class="code-box animate-fadein opacity-0 duration-100 ease-in-out"
            :class="{ 'opacity-100': hoveredSection === 'develop' }"
            :auto-start="hoveredSection === 'develop'"
            :code="codeData"
            :delay="45"
            :auto-fill="watchedAnimations.develop"
          />
          <DeployAnimation
            v-if="hoveredSection === 'deploy'"
            class="animate-fadein opacity-0 duration-100 ease-in-out"
            :class="{ 'opacity-100': hoveredSection === 'deploy' }"
            :auto-start="hoveredSection === 'deploy'"
            :auto-fill="watchedAnimations.deploy"
          />
        </MainContentBox>
      </div>
    </SectionComponent>
  </div>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import MainContentBox from '~/components/MainContentBox.vue'
import ReactiveText from '~/components/main-section/ReactiveText.vue'
import TypeWriter from '~/components/main-section/TypeWriter.vue'
import FigmaAnimation from '~/components/main-section/FigmaAnimation.vue'
import DeployAnimation from '~/components/main-section/DeployAnimation.vue'
import ProfileCard from '~/components/main-section/ProfileCard.vue'
import AboutMeCard from '~/components/main-section/AboutMeCard.vue'

// Handle hover over reactive text
const hoveredOverSection = ref(false)
const hoveredSection: Ref<string> = ref('')

const watchedAnimations = ref({
  develop: false,
  design: false,
  deploy: false,
})

const mainContentBoxClasses = computed(() => {
  let classes = ''

  if (hoveredSection.value !== '') {
    classes += ' lg:w-[85%] 2xl:w-[65%]'
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
  await new Promise((resolve) => setTimeout(resolve, withDelay ? 750 : 0))

  if (!hoveredOverSection.value) {
    hoveredSection.value = ''
  }
}

const sectionToSectionName = computed(
  () => hoveredSection.value.charAt(0).toUpperCase() + hoveredSection.value.slice(1),
)

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
