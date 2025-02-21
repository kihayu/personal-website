<template>
  <div class="relative h-full rounded-md" role="region" aria-label="Design Animation Display">
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-neutral-800 p-1.5">
      <div class="flex gap-1">
        <ToolbarIcon :active="currentTool === 'move'">
          <MoveToolIcon />
        </ToolbarIcon>
        <ToolbarIcon :active="currentTool === 'frame'">
          <FrameToolIcon />
        </ToolbarIcon>
        <ToolbarIcon :active="currentTool === 'rectangle'">
          <RectangleToolIcon />
        </ToolbarIcon>
        <ToolbarIcon :active="currentTool === 'text'">
          <TextToolIcon />
        </ToolbarIcon>
      </div>
    </div>

    <div
      class="pointer-events-none absolute top-0 left-0 z-10 h-6 w-6 transition-all duration-300 ease-out"
      :style="{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }"
    >
      <!-- SVG for cursor (could be in seperate file?) -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L20 12L12 14L10 22L4 4Z" fill="white" />
      </svg>
    </div>

    <div
      class="absolute z-20 transition-opacity duration-300"
      :class="'opacity-' + (showRadiusControl ? 1 : 0)"
      :style="{
        left: `${rectPos.x - 24}px`,
        top: `${rectPos.y + rectSize.height}px`,
      }"
    >
      <div class="flex items-center gap-2 rounded bg-neutral-800 px-2 py-1 text-xs text-white">
        <span class="text-neutral-400">R</span>
        <span>{{ borderRadius }}px</span>
      </div>
    </div>

    <div
      class="absolute border-white bg-blue-500 transition-all duration-300"
      :class="'opacity-' + rectOpacity"
      :style="{
        left: `${rectPos.x}px`,
        top: `${rectPos.y}px`,
        width: `${rectSize.width}px`,
        height: `${rectSize.height}px`,
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }"
    >
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium text-white transition-opacity duration-300"
        :class="'opacity-' + textOpacity"
      >
        Button
      </span>
    </div>
    <button
      v-if="showPauseButton"
      class="absolute right-4 bottom-4 h-12 w-12 cursor-pointer rounded-3xl bg-[rgba(255,255,255,0.2)]"
      role="button"
      :aria-label="isPaused ? 'Play animation' : 'Pause animation'"
      tabindex="0"
      @keydown.space.prevent="togglePause"
      @click="togglePause"
    >
      <PlayIcon v-if="isPaused" class="mx-auto my-auto h-12 w-6" />
      <PauseIcon v-else class="mx-auto my-auto h-12 w-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import ToolbarIcon from '~/components/animations/design/ToolbarIcon.vue'
import FrameToolIcon from '~/assets/icons/design/frame-tool.svg'
import MoveToolIcon from '~/assets/icons/design/move-tool.svg'
import RectangleToolIcon from '~/assets/icons/design/rectangle-tool.svg'
import TextToolIcon from '~/assets/icons/design/text-tool.svg'
import PauseIcon from '~/assets/icons/heroicons/pause.svg'
import PlayIcon from '~/assets/icons/heroicons/play.svg'

export interface DesignAnimationProps {
  autoFill?: boolean
  loop?: boolean
  showPauseButton?: boolean
}

const props = withDefaults(defineProps<DesignAnimationProps>(), {
  autoFill: false,
  loop: false,
  showPauseButton: false,
})

// Canvas specific properties
const cursorPos = reactive({ x: 50, y: 50 })
const rectPos = reactive({ x: 100, y: 100 })
const rectSize = reactive({ width: 0, height: 0 })
const borderRadius = ref(0)
const borderWidth = ref(0)
const rectOpacity = ref(0)
const textOpacity = ref(0)
const showRadiusControl = ref(false)
const currentTool = ref('move')

// Animation manager properties
let currentStep = ref(0)
let animationFrame: number | null = null
let isPaused = ref(false)

const steps = [
  // Set cursor to start position and select rectangle tool
  () => {
    cursorPos.x = 100
    cursorPos.y = 100
    currentTool.value = 'rectangle'
  },
  // Start drawing rectangle
  () => {
    rectOpacity.value = 1
    rectPos.x = cursorPos.x
    rectPos.y = cursorPos.y
  },
  // Drag to create rectangle
  () => {
    cursorPos.x = 250
    cursorPos.y = 150
    rectSize.width = 150
    rectSize.height = 50
  },
  // Move cursor to border radius control
  () => {
    cursorPos.x = 76
    cursorPos.y = 150
    showRadiusControl.value = true
  },
  // Adjust border radius
  async () => {
    while (borderRadius.value < 10) {
      borderRadius.value++
      await new Promise((resolve) => setTimeout(resolve, 20))
    }
  },
  // Move cursor to center for text and select text tool
  () => {
    showRadiusControl.value = false
    cursorPos.x = 175
    cursorPos.y = 125
    currentTool.value = 'text'
  },
  // Show text inside button
  () => {
    textOpacity.value = 1
  },
  // Move cursor to right bottom edge of button and select move tool
  () => {
    cursorPos.x = 225
    cursorPos.y = 140
    currentTool.value = 'move'
  },
  // Move cursor a bit in center direction and adjust border width
  () => {
    cursorPos.x = 220
    cursorPos.y = 130
    borderWidth.value = 4
  },
  // Move cursor out of the way (just to make button room to breath)
  () => {
    cursorPos.x = 260
    cursorPos.y = 150
  },
]

const animate = () => {
  if (isPaused.value && animationFrame) {
    cancelAnimationFrame(animationFrame)
    return
  }

  if (currentStep.value >= steps.length) {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    if (props.loop) {
      startAnimation()
    }
    return
  }

  steps[currentStep.value]()
  currentStep.value++

  animationFrame = setTimeout(
    () => {
      requestAnimationFrame(animate)
    },
    currentStep.value <= 2 ? 350 : 1000,
  ) as unknown as number
}

const startAnimation = () => {
  currentStep.value = 0
  cursorPos.x = 50
  cursorPos.y = 50
  rectSize.width = 0
  rectSize.height = 0
  borderWidth.value = 0
  borderRadius.value = 0
  rectOpacity.value = 0
  textOpacity.value = 0

  if (props.autoFill) {
    cursorPos.x = 260
    cursorPos.y = 150
    rectPos.x = 100
    rectPos.y = 100
    rectSize.width = 150
    rectSize.height = 50
    borderWidth.value = 4
    borderRadius.value = 10
    rectOpacity.value = 1
    textOpacity.value = 1
    return
  }

  requestAnimationFrame(animate)
}

const togglePause = () => {
  isPaused.value = !isPaused.value
  if (!isPaused.value) {
    animate()
  }
}

onMounted(() => {
  startAnimation()
})

onBeforeUnmount(() => {
  if (animationFrame) {
    clearTimeout(animationFrame)
  }
})

defineExpose({
  startAnimation,
})
</script>
