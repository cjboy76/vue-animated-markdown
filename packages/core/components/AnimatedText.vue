<script setup lang='ts'>
import { inject } from 'vue'
import { type AnimatedMarkdownContext, AnimatedMarkdownProviderKey } from './AnimatedMarkdown.vue'

defineProps<{
  data: string[]
}>()

const context = inject<AnimatedMarkdownContext>(AnimatedMarkdownProviderKey)
</script>

<template>
  <TransitionGroup tag="div" :name="context?.transition">
    <div v-for="(item, index) of data" :key="index" style="display: inline-block; white-space: pre;">
      {{ item }}
    </div>
  </TransitionGroup>
</template>
