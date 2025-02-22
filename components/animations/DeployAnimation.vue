<template>
  <div
    class="deploy-animation h-full rounded-lg p-6 shadow-[0px_0px_0px_1px_rgba(255_255_255_0.1)]"
    role="region"
    aria-label="Deployment Process Animation"
  >
    <div
      class="relative flex h-full items-center justify-between lg:px-2 xl:px-14"
      role="list"
      aria-label="Deployment Steps"
    >
      <DeployIcon :current-step="currentStep" :activate-step="0" color="blue">
        <CodeIcon />
        <template #label>
          <span class="flex items-center text-center text-sm text-neutral-300 md:text-base">Code</span>
        </template>
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="1" color="orange">
        <VersionControlIcon />
        <template #label>
          <span class="flex items-center text-center text-sm text-neutral-300 md:text-base">Version Control</span>
        </template>
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="2" color="red">
        <VercelIcon />
        <template #label>
          <span class="flex items-center text-center text-sm text-neutral-300 md:text-base">Distribution Server</span>
        </template>
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="3" color="green">
        <ServerIcon />
        <template #label>
          <span class="flex items-center text-center text-sm text-neutral-300 md:text-base">Server</span>
        </template>
      </DeployIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeployIcon from '~/components/animations/deploy/DeployIcon.vue'
import DotSpinner from '~/components/animations/deploy/DotSpinner.vue'
import CodeIcon from '~/assets/icons/deploy/code.svg'
import ServerIcon from '~/assets/icons/deploy/server.svg'
import VercelIcon from '~/assets/icons/deploy/vercel.svg'
import VersionControlIcon from '~/assets/icons/deploy/version-control.svg'

export interface DeployAnimationProps {
  autoFill?: boolean
}

const props = withDefaults(defineProps<DeployAnimationProps>(), {
  autoFill: false,
})

const currentStep = ref(-1)
let animationFrame: number | null = null

const steps = [
  // Start at Code
  () => {
    currentStep.value = 0
  },
  // Move to Git
  () => {
    currentStep.value = 1
  },
  // Move to Jenkins
  () => {
    currentStep.value = 2
  },
  // Move to Server
  () => {
    currentStep.value = 3
  },
]

const animate = async () => {
  if (currentStep.value >= steps.length - 1) {
    currentStep.value = 0
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  // Execute current step
  steps[currentStep.value + 1]()

  // Schedule next step
  setTimeout(() => {
    animationFrame = requestAnimationFrame(animate)
  }, 1000)
}

const startAnimation = () => {
  if (props.autoFill) {
    // Show final state immediately
    currentStep.value = 4
    return
  }

  // Start animation
  requestAnimationFrame(animate)
}

onMounted(() => {
  setTimeout(startAnimation, props.autoFill ? 0 : 300)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

defineExpose({
  startAnimation,
})
</script>
