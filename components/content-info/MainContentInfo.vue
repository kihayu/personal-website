<template>
  <div class="grid w-full grid-cols-[40px_1fr_40px] grid-rows-1 justify-center border-b border-neutral-600 pb-4">
    <span
      class="flex h-full w-full cursor-pointer items-center justify-center text-2xl text-neutral-400"
      @click="emit('clear-section')"
    >
      ←
    </span>
    <h4 class="font-title flex justify-center text-2xl font-bold md:text-3xl xl:text-4xl">
      {{ sectionToSectionName }}
    </h4>
  </div>
  <DesignInfo v-if="selectedSection === 'design'" />
  <DevelopInfo v-else-if="selectedSection === 'develop'" />
  <DeployInfo v-else-if="selectedSection === 'deploy'" />
</template>

<script setup lang="ts">
import DesignInfo from '~/components/content-info/DesignInfo.vue'
import DevelopInfo from '~/components/content-info/DevelopInfo.vue'
import DeployInfo from '~/components/content-info/DeployInfo.vue'

export interface MainContentInfoProps {
  selectedSection: string
}

const props = defineProps<MainContentInfoProps>()

const sectionToSectionName = computed(
  () => props.selectedSection.charAt(0).toUpperCase() + props.selectedSection.slice(1),
)

const emit = defineEmits(['clear-section'])
</script>
