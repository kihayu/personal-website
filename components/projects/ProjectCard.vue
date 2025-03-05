<template>
  <div
    class="relative flex min-h-fit flex-col rounded-lg border border-neutral-400 p-4 text-white no-underline hover:cursor-pointer hover:[&_.link-arrows]:underline"
  >
    <h3 class="font-title text-2xl font-bold">{{ title }}</h3>
    <span class="font-paragraph flex-1 text-lg">{{ description }}</span>
    <div class="mt-6 flex justify-between">
      <div class="flex flex-row gap-2">
        <span
          v-for="technology in technologies"
          :key="technology"
          class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white"
        >
          {{ technology }}
        </span>
      </div>
      <NuxtLink
        :to="`/projects/${projectName}`"
        class="link-arrows select-none after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:content-['\a']"
      >
        >>>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  projectName: number
}

defineProps<ProjectCardProps>()
</script>
