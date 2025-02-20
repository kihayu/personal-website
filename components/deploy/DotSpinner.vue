<template>
  <div class="looping-dot-spinner relative box-border flex h-4 w-12 items-center overflow-hidden">
    <div
      v-for="i in 4"
      :key="i"
      class="dot animate-deploy-looping-dot absolute left-16 mx-auto my-0 box-border h-2 w-2 rounded-md bg-zinc-300"
    />
  </div>
</template>

<style>
.looping-dot-spinner .dot:nth-child(1) {
  animation-delay: calc(2500ms * 1 / -4);
}

.looping-dot-spinner .dot:nth-child(2) {
  animation-delay: calc(2500ms * 2 / -4);
}

.looping-dot-spinner .dot:nth-child(3) {
  animation-delay: calc(2500ms * 3 / -4);
}

.looping-dot-spinner .dot:nth-child(4) {
  animation-delay: calc(2500ms * 4 / -4);
}
</style>
