<template>
  <div class="flex w-full flex-col gap-x-16 gap-y-12">
    <div
      class="flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0 lg:px-[12.5%]"
      @mouseleave="resetHoveredSection(false)"
    >
      <ReactiveText
        name="design"
        @mouseover="setHoveredSection"
        @mouseleave="resetHoveredSection"
        @click="emit('click:reactive-text', 'design')"
        @keydown.enter="emit('click:reactive-text', 'design')"
        @keydown.space.prevent="emit('click:reactive-text', 'design')"
      >
        Design
      </ReactiveText>
      <ReactiveText
        name="develop"
        @mouseover="setHoveredSection"
        @mouseleave="resetHoveredSection"
        @click="emit('click:reactive-text', 'develop')"
        @keydown.enter="emit('click:reactive-text', 'develop')"
        @keydown.space.prevent="emit('click:reactive-text', 'develop')"
      >
        Develop
      </ReactiveText>
      <ReactiveText
        name="deploy"
        @mouseover="setHoveredSection"
        @click="emit('click:reactive-text', 'deploy')"
        @keydown.enter="emit('click:reactive-text', 'deploy')"
        @keydown.space.prevent="emit('click:reactive-text', 'deploy')"
        @mouseleave="resetHoveredSection"
      >
        Deploy
      </ReactiveText>
    </div>
    <MainContentWindow class="mx-auto hidden lg:flex" :class="mainContentBoxClasses" :title="sectionToSectionName">
      <DesignAnimation
        v-if="hoveredSection === 'design'"
        class="animate-fadein opacity-0 duration-100 ease-in-out"
        :class="{ 'opacity-100': hoveredSection === 'design' }"
        :auto-fill="watchedAnimations.design"
      />
      <DevelopAnimation
        v-if="hoveredSection === 'develop'"
        class="code-box animate-fadein opacity-0 duration-100 ease-in-out"
        :class="{ 'opacity-100': hoveredSection === 'develop' }"
        :auto-start="hoveredSection === 'develop'"
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
    </MainContentWindow>
  </div>
</template>
<script setup lang="ts">
import ReactiveText from '~/components/ReactiveText.vue'
import DesignAnimation from '~/components/animations/DesignAnimation.vue'
import DevelopAnimation from '~/components/animations/DevelopAnimation.vue'
import DeployAnimation from '~/components/animations/DeployAnimation.vue'
import MainContentWindow from '~/components/MainContentWindow.vue'

const emit = defineEmits<{
  'click:reactive-text': [name: string]
}>()

const hoveredOverSection = ref(false)
const hoveredSection: Ref<string> = ref('')

const watchedAnimations = ref({
  develop: false,
  design: false,
  deploy: false,
})

const setHoveredSection = async (name: string) => {
  hoveredOverSection.value = true
  hoveredSection.value = name
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (!hoveredOverSection.value) {
    return
  }
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

const mainContentBoxClasses = computed(() => {
  let classes = ''

  if (hoveredSection.value !== '') {
    classes += ' lg:w-[85%] 2xl:w-[65%]'
  }

  classes += ' opacity-100 scale-100'

  return classes
})
</script>
