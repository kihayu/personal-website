<template>
  <div class="">
    <SectionComponent class="gap-y-8">
      <div
        class="flex w-full flex-col justify-center gap-x-8 gap-y-8 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr]"
      >
        <ProfileCard />
        <AboutMeCard />
      </div>
      <div
        ref="mainContent"
        class="flex h-fit min-h-fit w-full flex-col items-center justify-center gap-x-16 gap-y-4 rounded-md bg-stone-800 px-6 pt-4 pb-8"
      >
        <MainContent v-if="selectedSection.trim() === ''" @click:reactive-text="selectedSection = $event" />
        <MainContentInfo v-else :selected-section="selectedSection" @clear-section="selectedSection = ''" />
      </div>
    </SectionComponent>
  </div>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import AboutMeCard from '~/components/AboutMeCard.vue'
import MainContent from '~/components/MainContent.vue'
import MainContentInfo from '~/components/content-info/MainContentInfo.vue'

const mainContent = ref<ComponentPublicInstance<HTMLDivElement> | null>(null)
const selectedSection = ref('')
</script>
