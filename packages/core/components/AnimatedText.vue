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
    <span v-for="(item, index) of data" :key="index">{{ item }}</span>
  </TransitionGroup>
</template>
