<template>
  <div
    class="flex h-32 flex-col rounded-lg border border-neutral-400 p-4 hover:cursor-pointer hover:[&_.link-arrows]:underline"
  >
    <h3 class="font-title text-2xl font-bold">Project Title</h3>
    <span class="font-paragraph flex-1 text-lg">Project Description</span>
    <div class="flex justify-between">
      <div class="flex flex-row gap-2">
        <span class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white">Frontend</span>
        <span class="font-title rounded bg-neutral-700 px-2 py-1 text-sm text-white">Backend</span>
      </div>
      <span class="link-arrows select-none">>>></span>
    </div>
  </div>
</template>
