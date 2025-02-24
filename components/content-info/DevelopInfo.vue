<template>
  <div class="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-6 lg:grid-cols-2">
    <div class="flex h-full flex-col gap-y-2">
      <p
        class="font-paragraph w-full text-xl first-letter:float-left first-letter:mt-2 first-letter:pr-1 first-letter:text-6xl first-letter:leading-10"
      >
        Development is a skill that is with me since 2012, when I got into a course, started with Scratch and continued
        learning Python and later Java. At school I learned the basics of C# and .NET and basic HTML with CSS and very
        little JavaScript.
      </p>
      <p class="font-paragraph w-full text-xl">
        Shortly after I got my first job as a Backend Developer, where I worked with PHP. After a short period I found
        myself interested in Frontend Development with Vue.js and started building my way to become a Fullstack
        Developer. Since 2018 I have been working and improving my skills in JavaScript/TypeScript, together with Vue.js
        and Node.js (incl. Bun) as my Frontend arm, with mainly Node.js and Python as my backend arm.
      </p>
      <p class="font-paragraph w-full text-xl">
        Today I enjoy working on different projects and trying new technologies like Flutter for mobile development,
        Godot for game development and Large Language Model APIs from providers like OpenAI, Anthropic or Google.
      </p>
    </div>
    <div class="min-h-64 rounded-xl bg-stone-900 p-4 lg:block lg:h-full lg:min-w-1/2 xl:min-w-[45%]">
      <DevelopAnimation :font-size="isMobile ? 'text-xs' : 'text-sm'" :greeting-code="false" loop show-pause-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import DevelopAnimation from '~/components/animations/DevelopAnimation.vue'
import { isMobile } from '~/utils/isMobile'
</script>
