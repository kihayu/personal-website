<template>
  <div class="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-6 lg:grid-cols-2">
    <div class="flex h-fit flex-col gap-y-2 lg:h-full">
      <p
        class="font-paragraph h-full w-full text-xl first-letter:float-left first-letter:mt-2 first-letter:pr-1 first-letter:text-6xl first-letter:leading-10"
      >
        In my work as frontend developer on customer projects I learned a lot about user experience, user interfaces and
        web design. I started learning about color theory and design principles to optimize the user experience for
        different platforms like Admin Interfaces, News, Blogs or Social Media Platforms.
      </p>
      <p class="font-paragraph h-full w-full text-xl">
        A fitting design is very important for a good user experience and for myself as a bad interface can make or
        break a product or service very easily. As well as having no accessibility in mind. Accessibility is, in my
        opinion, best done in a way that the core functionality is usable with the least effort, without restricting any
        functionality.
      </p>
      <p class="font-paragraph h-full w-full text-xl">
        Most of my work is done in Figma, as it's a great tool for beginner and intermediate users. Many of my larger
        projects are first, at least conceptually, done in Figma.
      </p>
    </div>
    <div class="min-h-72 rounded-xl bg-stone-900 lg:block lg:h-full lg:min-w-1/2 xl:min-w-[45%]">
      <FigmaAnimation font-size="text-base" loop show-pause-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import FigmaAnimation from '~/components/animations/FigmaAnimation.vue'
</script>
