<template>
  <div class="flex w-full flex-col items-center rounded-md bg-stone-800 p-4 shadow-md" role="banner">
    <picture>
      <source
        srcset="
          ~/assets/images/profile-photo-96.webp  1x,
          ~/assets/images/profile-photo-192.webp 2x,
          ~/assets/images/profile-photo-288.webp 3x
        "
        type="image/webp"
      />
      <source
        srcset="
          ~/assets/images/profile-photo-96.jpg  1x,
          ~/assets/images/profile-photo-192.jpg 2x,
          ~/assets/images/profile-photo-288.jpg 3x
        "
        type="image/jpeg"
      />
      <img
        src="~/assets/images/profile-photo-96.jpg"
        alt="Profile Picture of Keanu Hie"
        class="h-24 w-24 rounded-full object-cover"
        width="96"
        height="96"
        loading="eager"
        decoding="async"
      />
    </picture>
    <h1 class="font-title mt-2 text-3xl font-semibold">Keanu Hie</h1>
    <p class="font-subtitle mt-2 text-center text-base text-neutral-300">
      Fullstack Developer<br />Located in Vienna, Austria
    </p>
    <div class="mt-12 flex items-center justify-center gap-6" role="navigation" aria-label="Social Links">
      <a
        href="https://github.com/kihayu"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Keanu's GitHub Profile"
        class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
      >
        <GitHubIcon
          class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
          role="img"
          aria-hidden="true"
        />
      </a>
      <a
        href="https://linkedin.com/in/keanu-hie/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Keanu's LinkedIn Profile"
        class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white active:scale-95"
      >
        <LinkedInIcon
          class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
          role="img"
          aria-hidden="true"
        />
      </a>
      <a
        href="mailto:hie.keanu@gmail.com"
        aria-label="Send an Email to Keanu Hie"
        class="group rounded-full p-1 transition-transform duration-150 ease-out outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white active:scale-95"
      >
        <MailIcon
          class="w-8 fill-white transition-transform duration-150 ease-out group-hover:scale-110"
          role="img"
          aria-hidden="true"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import GitHubIcon from '~/assets/icons/brands/github.svg'
import LinkedInIcon from '~/assets/icons/brands/linkedin.svg'
import MailIcon from '~/assets/icons/heroicons/mail.svg'
</script>
