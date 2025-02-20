<template>
  <div class="">
    <SectionComponent class="gap-y-8">
      <div
        class="flex h-fit w-full flex-col justify-center gap-x-8 gap-y-8 md:grid md:grid-cols-[350px_1fr] md:grid-rows-1"
      >
        <div class="flex w-full flex-col items-center rounded-md bg-stone-800 p-4 shadow-md">
          <img
            src="https://picsum.photos/512/512?blur=2&random=1"
            alt="Profile Picture"
            class="h-24 w-24 rounded-full object-cover"
          />
          <h1 class="font-title mt-2 text-3xl font-semibold">Keanu Hie</h1>
          <span class="font-subtitle mt-2 text-center text-base text-neutral-300">
            Frontend & Backend Developer<br />from Vienna, Austria
          </span>
          <div class="mt-12 flex items-center justify-center gap-6">
            <a href="https://github.com/kihayu" target="_blank" rel="noopener noreferrer">
              <GitHubIcon class="w-8 fill-white transition-transform duration-150 ease-out active:scale-90" />
            </a>
            <a href="https://linkedin.com/in/keanu-hie-0750a2184/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon class="w-8 fill-white transition-transform duration-150 ease-out active:scale-90" />
            </a>
          </div>
        </div>
        <div class="h-full w-full rounded-md bg-stone-800 p-4 shadow-md">
          <h2 class="font-title text-3xl font-semibold">About me</h2>
          <p class="font-paragraph mt-2 text-lg lg:text-xl">
            Hi, I'm a Frontend/Fullstack Developer with a focus on Web-Development, specifically UI/UX, functionality
            and clean code.<br />
            With over 7 years of professional experience, I have a good understanding of diverse frontend topics such as
            Styleguides, Accessibility, Responsive Design, Component-Driven Development and more. Most of this
            experience was done in Vue.js with SCSS or Tailwind, as well as Storybook on larger projects, including
            React and Next.js on a smaller scale. Also working on backend technologies is nothing new for me as I've
            already built diverse API's and Microservices, as well as helped with the architecture of complex systems.
          </p>
        </div>
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
            :auto-start="hoveredSection === 'design'"
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
import GitHubIcon from '~/assets/icons/brands/github.svg'
import LinkedInIcon from '~/assets/icons/brands/linkedin.svg'

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
