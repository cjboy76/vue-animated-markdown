# vue-animated-markdown

Vue component to render animated markdown for LLM text streaming

## Installation

```
npm install vue-animated-markdown
```

## Usage

```html
<script setup lang="ts">
  import { AnimatedMarkdown } from 'vue-animated-markdown'
</script>

<template>
  <div>
    <AnimatedMarkdown content="# Hello World" seperator="word" transition="fade-in" />
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
```
