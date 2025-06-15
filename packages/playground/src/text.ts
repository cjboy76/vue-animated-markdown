export const text = `# vue-animated-markdown

[GitHub](https://github.com/cjboy76/vue-animated-markdown)

Vue component to render animated markdown for LLM text streaming with fully customized transitions

## Demo

Visit demo: [demo link](https://cjboy76.github.io/vue-animated-markdown/)

## Installation

\`\`\`
npm install vue-animated-markdown
\`\`\`

## Usage

\`\`\`html
<script setup lang="ts">
  import { AnimatedMarkdown } from 'vue-animated-markdown'
<\/script>

<template>
  <div>
    <AnimatedMarkdown content="# Hello World" seperator="word" transition="fade-in" />
  </div>
</template>

<style scoped>
/* Make your own transition here! */
:deep(.fade-in-enter-active) {
  transition: all 1s ease;
}

:deep(.fade-in-enter-from) {
  opacity: 0;
  transform: translateY(10px);
}
</style>
\`\`\`

## AnimatedMarkdown Component

### Props

| Prop       | Type                        | Default   | Description                                                                                           |
|------------|----------------------------|-----------|-------------------------------------------------------------------------------------------------------|
| content    | \`string\`                   | —         | The markdown string to render and animate.                                                            |
| transition | \`string\`                   | —      |The name of a Vue transition to apply to each animated token for custom animation effects.  |
| seperator  | \`'word'\` \\| \`'character'\`  | \`'word'\`  | Determines the animation granularity: split and animate by word or by character.                      |
`