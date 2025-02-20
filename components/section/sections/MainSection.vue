<template>
  <div class="">
    <SectionComponent class="gap-y-8">
      <div
        class="flex h-fit w-full flex-col justify-center gap-x-8 gap-y-8 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr]"
      >
        <div class="flex w-full flex-col items-center rounded-md bg-stone-800 p-4 shadow-md" role="banner">
          <picture>
            <source
              srcset="
                ~/assets/images/profile-photo-96.webp  1x,
                ~/assets/images/profile-photo-192.webp 2x,
                ~/assets/images/profile-photo-288.webp 3x
              "
              type="image/webp"
            />
            <source
              srcset="
                ~/assets/images/profile-photo-96.jpg  1x,
                ~/assets/images/profile-photo-192.jpg 2x,
                ~/assets/images/profile-photo-288.jpg 3x
              "
              type="image/jpeg"
            />
            <img
              src="~/assets/images/profile-photo-96.jpg"
              alt="Profile Picture of Keanu Hie"
              class="h-24 w-24 rounded-full object-cover"
              width="96"
              height="96"
              loading="eager"
              decoding="async"
            />
          </picture>
          <h1 class="font-title mt-2 text-3xl font-semibold">Keanu Hie</h1>
          <p class="font-subtitle mt-2 text-center text-base text-neutral-300">
            Frontend & Backend Developer<br />located in Vienna, Austria
          </p>
          <div class="mt-12 flex items-center justify-center gap-6" role="navigation" aria-label="Social Links">
            <a
              href="https://github.com/kihayu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Keanu's GitHub Profile"
              class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              <GitHubIcon
                class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
                role="img"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://linkedin.com/in/keanu-hie-0750a2184/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Keanu's LinkedIn Profile"
              class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              <LinkedInIcon
                class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
                role="img"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <div class="h-full w-full rounded-md bg-stone-800 p-4 shadow-md" role="main">
          <h2 class="font-title text-3xl font-semibold" id="about-section">About me</h2>
          <div class="space-y-4 will-change-contents" aria-labelledby="about-section">
            <p class="font-paragraph text-lg will-change-contents md:text-xl">
              Hi, I'm a Frontend/Fullstack Developer with a focus on Web-Development, specifically UI/UX, functionality
              and clean code.
            </p>
            <p class="font-paragraph text-lg will-change-contents md:text-xl">
              With over 7 years of professional experience, I have a good understanding of diverse frontend topics such
              as Styleguides, Accessibility, Responsive Design, and Component-Driven Development.
            </p>
            <p class="font-paragraph text-lg will-change-contents md:text-xl">
              Most of this experience was done in Vue.js with SCSS or Tailwind, as well as Storybook on larger projects,
              including React and Next.js on a smaller scale.
            </p>
            <p class="font-paragraph text-lg will-change-contents md:text-xl">
              Also working on backend technologies is nothing new for me as I've already built diverse API's and
              Microservices, as well as helped with the architecture of complex systems.
            </p>
          </div>
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
