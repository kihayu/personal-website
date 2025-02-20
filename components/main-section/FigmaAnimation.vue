<template>
  <div class="figma-window rounded-lg bg-neutral-800 p-4 shadow-[0px_0px_0px_1px_rgba(255_255_255_0.1)]">
    <div class="mb-4 flex items-center gap-2">
      <div class="h-3 w-3 rounded-full bg-red-500" />
      <div class="h-3 w-3 rounded-full bg-yellow-500" />
      <div class="h-3 w-3 rounded-full bg-green-500" />
    </div>

    <div class="relative h-[300px] rounded-md bg-neutral-900 p-4">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolbarIcon from '~/components/main-section/figma-animation/ToolbarIcon.vue'
import FrameToolIcon from '~/assets/icons/figma/FrameTool.svg'
import MoveToolIcon from '~/assets/icons/figma/MoveTool.svg'
import RectangleToolIcon from '~/assets/icons/figma/RectangleTool.svg'
import TextToolIcon from '~/assets/icons/figma/TextTool.svg'

export interface FigmaAnimationProps {
  autoStart?: boolean
  autoFill?: boolean
}

const props = withDefaults(defineProps<FigmaAnimationProps>(), {
  autoStart: false,
  autoFill: false,
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
let currentStep = 0
let animationFrame: number | null = null

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
  if (currentStep >= steps.length) {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    return
  }

  steps[currentStep]()
  currentStep++

  animationFrame = setTimeout(() => {
    requestAnimationFrame(animate)
  }, 1000) as unknown as number
}

const startAnimation = () => {
  currentStep = 0
  rectSize.width = 0
  rectSize.height = 0
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

onMounted(() => {
  if (props.autoStart) {
    startAnimation()
  }
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
