<script setup lang="ts">
import { ref } from 'vue'
import { AnimatedMarkdown } from 'vue-animated-markdown'
import remarkGfm from 'remark-gfm'
import { text } from './text'

const markdownText = text
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
</script>

<template>
  <div>
    <AnimatedMarkdown :content="content" seperator="word" transition="fade-in" :remark-plugins='remarkPlugins' />
  </div>
</template>

<style scoped>
:deep(.fade-in-enter-active) {
  transition: all 1s ease;
}

:deep(.fade-in-enter-from) {
  opacity: 0;
  transform: translateY(10px);
}
</style>