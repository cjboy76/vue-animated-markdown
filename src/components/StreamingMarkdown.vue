<script setup lang='ts'>
import MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it/index.js'
import { ref, watch } from 'vue'
import Chunk from './Chunk.vue'
import type { StreamingToken } from '../shared.types'
import { processTokens } from '../utils'

defineOptions({
  name: 'StreamingMarkdown'
})

interface StreamingMarkdownProps {
  content: string,
  seperator?: 'word' | 'character'
  animationDuration?: string
}

const props = withDefaults(defineProps<StreamingMarkdownProps>(), {
  animationDuration: '0.5s',
  seperator: 'word'
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const tokens = ref<StreamingToken[]>([])
watch(() => props.content, parseContent)

function parseContent(content: string) {
  if (!content) {
    tokens.value = []
    return
  }
  const parsedTokens = md.parse(content, {})
  tokens.value = processTokens(parsedTokens, props.seperator)
}
</script>

<template>
  <div class="streaming-markdown" :style='{ "--streaming-animation-duration": animationDuration }'>
    <Chunk v-for="(token, index) in tokens" :key="`token-${index}`" :tag-name='token.tag' :children='token.children' />
  </div>
</template>

<style>
.list-move,
.list-enter-active {
  transition: all var(--streaming-animation-duration) ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>