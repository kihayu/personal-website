<template>
  <SectionComponent class="gap-y-4 lg:gap-y-8">
    <div
      class="flex w-full flex-col justify-center gap-4 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr] lg:gap-8"
    >
      <ProfileCard />
      <AboutMeCard />
    </div>
    <div class="min-h-fit w-full rounded-md bg-stone-800 p-6 py-8 shadow-md">
      <MainContentInfo
        v-if="selectedSection.trim() !== ''"
        ref="mainContentInfo"
        :selected-section="selectedSection"
        :scroll-position="scrollY"
        @clear-section="selectedSection = ''"
      />
      <MainContent
        :class="{ hidden: !isMobile && selectedSection.trim() !== '' }"
        @click:reactive-text="setSelectedSection"
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
import { useWindowScroll } from '@vueuse/core'
import { isMobile } from '~/utils/isMobile'

const selectedSection = ref('')

const mainContentInfo = ref<ComponentPublicInstance<HTMLDialogElement> | null>(null)
const setSelectedSection = (section: string) => {
  selectedSection.value = section
  mainContentInfo.value?.showModal()
}

const { y: scrollY } = useWindowScroll()
</script>
