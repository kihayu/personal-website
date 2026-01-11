<template>
  <footer class="mx-4 mt-8 max-w-[1280px] rounded-md bg-stone-800 p-6 shadow-md">
    <div class="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <div class="text-center md:text-left">
        <p class="text-sm text-neutral-300">
          © {{ currentYear }} Keanu Hie. All rights reserved.
        </p>
        <p class="mt-1 text-xs text-neutral-400">
          Built with Vue.js, Nuxt & TailwindCSS
        </p>
      </div>
      <nav class="flex gap-6" aria-label="Footer Navigation">
        <a
          href="https://github.com/kihayu"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral-300 transition-colors hover:text-white"
          aria-label="GitHub Profile"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/keanu-hie/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-neutral-300 transition-colors hover:text-white"
          aria-label="LinkedIn Profile"
        >
          LinkedIn
        </a>
        <a
          href="mailto:hie.keanu@gmail.com"
          class="text-sm text-neutral-300 transition-colors hover:text-white"
          aria-label="Email Contact"
        >
          Contact
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
