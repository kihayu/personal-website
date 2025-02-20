<template>
  <div class="deploy-animation h-full rounded-lg bg-neutral-800 p-6 shadow-[0px_0px_0px_1px_rgba(255_255_255_0.1)]">
    <div class="relative flex h-full items-center justify-between px-12">
      <DeployIcon :current-step="currentStep" :activate-step="0" color="blue">
        <CodeIcon />
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="1" color="orange">
        <VersionControlIcon />
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="2" color="red">
        <VercelIcon />
      </DeployIcon>

      <DotSpinner />

      <DeployIcon :current-step="currentStep" :activate-step="3" color="green">
        <ServerIcon />
      </DeployIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeployIcon from '~/components/main-section/deploy/DeployIcon.vue'
import DotSpinner from '~/components/main-section/deploy/DotSpinner.vue'
import CodeIcon from '~/assets/icons/deploy/code.svg'
import ServerIcon from '~/assets/icons/deploy/server.svg'
import VercelIcon from '~/assets/icons/deploy/vercel.svg'
import VersionControlIcon from '~/assets/icons/deploy/version-control.svg'

const props = defineProps<{
  autoFill?: boolean
}>()

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
    currentStep.value = -1
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
    currentStep.value = 3
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
