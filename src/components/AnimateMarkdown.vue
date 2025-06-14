<script lang='ts'>
type Seperator = 'word' | 'character'

export type AnimationMarkdownContext = {
  seperator: Seperator
  transition: string
}

export const providerSymbol = Symbol('animate-markdown') 
</script>

<script setup lang='ts'>
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import { provide, shallowRef, watch } from 'vue'
import type { Nodes } from 'hast'
import AnimateToken from './AnimateToken.vue'


type Props = {
  content: string,
  seperator?: Seperator
  animationDuration?: string
  transition?: string
}

defineOptions({
  name: 'AnimateMarkdown'
})

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })

async function transformAst(input: string) {
  const parseTree = processor.parse(input)
  const tree = await processor.run(parseTree)
  removePosition(tree, { force: true })
  return tree
}

const props = withDefaults(defineProps<Props>(), {
  animationDuration: '1s',
  seperator: 'word',
  transition: 'fade-in'
})

provide<AnimationMarkdownContext>(providerSymbol, {
  seperator: props.seperator,
  transition: props.transition
})

const root = shallowRef<Nodes>()

watch(() => props.content, async (content) => {
  root.value = content ? await transformAst(content) : undefined
})
</script>

<template>
  <div :style='{ "--streaming-animation-duration": animationDuration }'>
    <AnimateToken :data='root' />
  </div>
</template>

<style>
.fade-in-move,
.fade-in-enter-active {
  transition: all var(--streaming-animation-duration) ease;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>