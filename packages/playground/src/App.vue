<script setup lang="ts">
import { ref } from 'vue'
import { AnimatedMarkdown } from 'vue-animated-markdown'

const markdownText = `# My Markdown Example

This is a sample Markdown content.

## Subtitle

- Item one
- Item two
- Item three

1. First point
2. Second point
3. Third point

This is **bold text**, and this is *italic text*.

[This is a link to Google](https://www.google.com)

![This is an image](https://via.placeholder.com/150)

> This is a blockquote.

---

That's a basic example of Markdown syntax.
`

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
</script>

<template>
  <div>
    <AnimatedMarkdown :content="content" seperator="word" transition="fade-in" />
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
