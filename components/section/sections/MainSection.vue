<template>
  <SectionComponent class="gap-y-4 lg:gap-y-8" :class="{ 'max-h-screen': selectedSection.trim() !== '' }">
    <div
      class="flex w-full flex-col justify-center gap-x-4 gap-y-4 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr] lg:gap-x-8 lg:gap-y-8"
    >
      <ProfileCard />
      <AboutMeCard />
    </div>
    <div
      ref="mainContent"
      class="flex h-fit min-h-fit w-full flex-col items-center justify-center gap-x-16 gap-y-12 rounded-md bg-stone-800 p-6 py-8"
    >
      <MainContent v-if="selectedSection.trim() === ''" @click:reactive-text="setSelectedSection" />
      <MainContentInfo
        v-else
        ref="mainContentInfo"
        :selected-section="selectedSection"
        @clear-section="selectedSection = ''"
      />
    </div>
  </SectionComponent>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import AboutMeCard from '~/components/AboutMeCard.vue'
import MainContent from '~/components/MainContent.vue'
import MainContentInfo from '~/components/content-info/MainContentInfo.vue'

const mainContent = ref<ComponentPublicInstance<HTMLDivElement> | null>(null)
const selectedSection = ref('')

const mainContentInfo = ref<ComponentPublicInstance<HTMLDialogElement> | null>(null)
const setSelectedSection = (section: string) => {
  selectedSection.value = section
  mainContentInfo.value?.showModal()
}
</script>
