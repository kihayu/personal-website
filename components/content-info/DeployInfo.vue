<template>
  <div class="grid h-full w-full grid-cols-1 grid-rows-1 gap-x-6 lg:grid-cols-2">
    <div class="flex h-full flex-col gap-y-2">
      <p
        class="font-paragraph h-full w-full text-xl first-letter:float-left first-letter:mt-2 first-letter:pr-1 first-letter:text-6xl first-letter:leading-10"
      >
        One thing that my younger self asked himself was:
        <i>Working and developing on projects is fine but how can I make the finished result accessible to others?</i>
      </p>
      <p class="font-paragraph h-full w-full text-xl">
        After some time I started looking into servers and hosting, proper Git and Version Controlling and what tools
        are available for making websites available to others. Learning tools like Jenkins and how to deploy projects
        was one part, the other one was learning how to set up a linux server and installing the necessary software.
      </p>
      <p class="font-paragraph h-full w-full text-xl">
        Nowadays I also look into distribution platforms like Vercel, Netlify or Coolify, as they make publishing
        projects on a smaller scale very easy and more manageable for a single person.
      </p>
    </div>
    <div ref="deployAnimation" class="hidden h-full rounded-xl lg:block lg:w-full">
      <DeployAnimation font-size="text-base" loop show-pause-button />
    </div>
  </div>
</template>
<script setup lang="ts">
import DeployAnimation from '~/components/animations/DeployAnimation.vue'
</script>
