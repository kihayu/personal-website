<template>
  <div class="flex h-full w-full flex-row gap-x-6">
    <p
      class="font-paragraph h-full w-full text-lg first-letter:float-left first-letter:mt-2 first-letter:pr-1 first-letter:text-6xl first-letter:leading-10"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquam magni exercitationem aut ducimus
      doloribus, mollitia nostrum recusandae soluta. Necessitatibus magnam quae laborum dicta, minima ipsam voluptas
      iure pariatur provident!
    </p>
    <div class="hidden h-full rounded-xl lg:block lg:min-w-1/2 xl:min-w-[45%]">
      <FigmaAnimation font-size="text-base" loop show-pause-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import FigmaAnimation from '~/components/animations/FigmaAnimation.vue'
</script>
