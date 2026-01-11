<template>
  <NuxtLayout>
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div class="text-center">
        <h1 class="font-title text-9xl font-bold text-white">{{ error.statusCode }}</h1>
        <h2 class="font-title mt-4 text-3xl font-semibold text-white">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
        </h2>
        <p class="font-paragraph mt-4 text-lg text-neutral-300">
          {{ error.message || "The page you're looking for doesn't exist or has been moved." }}
        </p>
      </div>
      <div class="flex gap-4">
        <button
          @click="handleError"
          class="rounded-md bg-white px-6 py-3 font-semibold text-stone-900 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-900"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
