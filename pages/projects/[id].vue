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
import { useProjectStore } from '~/store/project'

definePageMeta({
  layout: 'detail',
})

const route = useRoute()
const router = useRouter()

const projectStore = useProjectStore()
const projects = projectStore.projects

const projectId = computed(() => route.params.id as string)
const projectData = computed(() => projects.find((project) => project.id === projectId.value))

const navigateBack = () => {
  router.back()
}
</script>
