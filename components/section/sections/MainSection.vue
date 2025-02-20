<template>
  <div class="">
    <SectionComponent class="gap-y-8">
      <div
        class="flex h-fit w-full flex-col justify-center gap-x-8 gap-y-8 sm:grid sm:grid-cols-[250px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr]"
      >
        <ProfileCard />
        <AboutMeCard />
      </div>
      <div
        class="flex w-full flex-col items-center justify-center gap-x-16 gap-y-10 rounded-md bg-stone-800 p-6 py-4 pb-8"
      >
        <MainContent />
      </div>
    </SectionComponent>
  </div>
</template>

<script setup lang="ts">
import SectionComponent from '~/components/section/SectionComponent.vue'
import ProfileCard from '~/components/main-section/ProfileCard.vue'
import AboutMeCard from '~/components/main-section/AboutMeCard.vue'
import MainContent from '~/components/main-section/MainContent.vue'
</script>
