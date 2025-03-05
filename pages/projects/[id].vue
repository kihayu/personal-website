<template>
  <div class="flex flex-col gap-y-4">
    <p class="font-paragraph text-lg">{{ projectData?.description || 'Loading project details...' }}</p>
    <div class="flex flex-row flex-wrap gap-2">
      <span
        v-for="tech in projectData?.technologies || []"
        :key="tech"
        class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '~/utils/isMobile'

definePageMeta({
  layout: 'detail',
})

const route = useRoute()
const router = useRouter()
const projectModal = ref<HTMLDialogElement | null>(null)

// TODO: Data will move to an application store at a later point
const projects = {
  '1': {
    title: 'Personal Website',
    description: 'A responsive Vue.js website with Nuxt.js',
    technologies: ['Vue', 'Nuxt', 'TailwindCSS'],
  },
  '2': {
    title: 'E-commerce Platform',
    description: 'A full-featured online store with cart and checkout',
    technologies: ['Vue', 'Node.js', 'MongoDB'],
  },
  '3': {
    title: 'Portfolio App',
    description: 'Mobile-first design for showcasing creative work',
    technologies: ['React Native', 'Firebase'],
  },
}

const projectId = computed(() => route.params.id as string)
const projectData = computed(() => projects[projectId.value as keyof typeof projects])

const navigateBack = () => {
  router.back()
}
</script>
