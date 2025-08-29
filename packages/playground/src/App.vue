<script setup lang="ts">
import { ref } from 'vue'
import { AnimatedMarkdown } from 'vue-animated-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { default as markdownText } from './text.md?raw'

const splited = markdownText.split('')
const content = ref('')
let index = 0
const interval = setInterval(() => {
  content.value += splited[index]
  index++

  if (index >= splited.length) {
    clearInterval(interval)
    content.value += '\n'
  }
}, 10)

const remarkPlugins = [remarkGfm]
const rehypePlugins = [rehypeRaw]
const remarkRehypeOptions = { allowDangerousHtml: true } // Enables HTML in markdown

// Transition selector
const selectedTransition = ref('fade-in')
const transitions = [
  { value: 'fade-in', label: 'Fade In' },
  { value: 'slide-in-left', label: 'Slide In Left' },
  { value: 'slide-in-right', label: 'Slide In Right' },
  { value: 'slide-in-up', label: 'Slide In Up' },
  { value: 'slide-in-down', label: 'Slide In Down' },
  { value: 'scale-in', label: 'Scale In' },
  { value: 'bounce-in', label: 'Bounce In' },
  { value: 'rotate-in', label: 'Rotate In' },
  { value: 'flip-in', label: 'Flip In' }
]

// Reset content for transition testing
function resetContent() {
  clearInterval(interval)
  content.value = ''
  index = 0
  const newInterval = setInterval(() => {
    content.value += splited[index]
    index++

    if (index >= splited.length) {
      clearInterval(newInterval)
      content.value += '\n'
    }
  }, 10)
}
</script>

<template>
  <div>
    <div class="controls">
      <h2>Vue Animated Markdown Demo</h2>
      <div class="transition-selector">
        <label for="transition-select">Choose Transition:</label>
        <select id="transition-select" v-model="selectedTransition" @change="resetContent">
          <option v-for="transition in transitions" :key="transition.value" :value="transition.value">
            {{ transition.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="content">
      <AnimatedMarkdown :content="content" seperator="word" :transition="selectedTransition" :remark-plugins='remarkPlugins'
        :rehype-plugins='rehypePlugins' :remarkRehypeOptions='remarkRehypeOptions' />
    </div>
  </div>
</template>

<style scoped>
.controls {
  padding: 20px;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
}

.controls h2 {
  margin: 0 0 15px 0;
  color: #646cff;
}

.transition-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.transition-selector label {
  font-weight: 500;
}

.transition-selector select {
  padding: 8px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #1a1a1a;
  color: white;
  font-size: 14px;
}

.content {
  padding: 0 20px;
}

/* Fade In - Original */
:deep(.fade-in-enter-active) {
  transition: all 1s ease-out;
}

:deep(.fade-in-enter-from) {
  opacity: 0;
}

/* Slide In Left */
:deep(.slide-in-left-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.slide-in-left-enter-from) {
  opacity: 0;
  transform: translateX(-30px);
}

/* Slide In Right */
:deep(.slide-in-right-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.slide-in-right-enter-from) {
  opacity: 0;
  transform: translateX(30px);
}

/* Slide In Up */
:deep(.slide-in-up-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.slide-in-up-enter-from) {
  opacity: 0;
  transform: translateY(30px);
}

/* Slide In Down */
:deep(.slide-in-down-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.slide-in-down-enter-from) {
  opacity: 0;
  transform: translateY(-30px);
}

/* Scale In */
:deep(.scale-in-enter-active) {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

:deep(.scale-in-enter-from) {
  opacity: 0;
  transform: scale(0.5);
}

/* Bounce In */
:deep(.bounce-in-enter-active) {
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

:deep(.bounce-in-enter-from) {
  opacity: 0;
  transform: scale(0.3) translateY(-20px);
}

/* Rotate In */
:deep(.rotate-in-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.rotate-in-enter-from) {
  opacity: 0;
  transform: rotate(-180deg) scale(0.8);
}

/* Flip In */
:deep(.flip-in-enter-active) {
  transition: all 0.8s ease-out;
}

:deep(.flip-in-enter-from) {
  opacity: 0;
  transform: rotateY(-90deg);
}
</style>