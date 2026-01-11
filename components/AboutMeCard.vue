<template>
  <section class="h-full w-full rounded-md bg-stone-800 p-4 shadow-md">
    <h2 class="font-title text-3xl font-semibold" id="about-section">About me</h2>
    <div class="mt-3 flex flex-col gap-4 will-change-contents" aria-labelledby="about-section">
      <p class="font-paragraph text-lg will-change-contents md:text-xl">
        Hi, I'm a Fullstack Developer with a focus on Frontend and Web-Development, specifically UI/UX, functionality
        and clean code. With over 12 years in the business and 7 years of professional experience, I have a good
        understanding of diverse frontend topics such as Styleguides, Accessibility, Responsive Design, and
        Component-Driven Development. Most of this experience was done in Vue.js with SCSS or Tailwind, as well as
        Storybook on larger projects, including React and Next.js on a smaller scale. Also working on backend
        technologies is nothing new for me as I've already built diverse API's and Microservices, as well as helped with
        the architecture of complex systems.
      </p>
      <div class="mt-2 flex flex-col gap-2">
        <h3 class="font-subtitle text-lg font-semibold">Let's connect!</h3>
        <p class="font-paragraph text-base text-neutral-300">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a
          href="mailto:hie.keanu@gmail.com"
          class="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2 font-semibold text-stone-900 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800"
        >
          <MailIcon :size="20" aria-hidden="true" />
          Get in Touch
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail as MailIcon } from 'lucide-vue-next'
</script>

<style>
.font-paragraph {
  font-display: swap;
}
</style>
