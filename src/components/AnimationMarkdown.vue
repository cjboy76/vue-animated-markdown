<script lang='ts'>
type Seperator = 'word' | 'character'

defineOptions({
  name: 'AnimationMarkdown'
})

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
import AnimateToken from './AnimationToken.vue'


type Props = {
  content: string,
  seperator?: Seperator
  transition: string
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
  seperator: 'word',
  transition: ''
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
  <div>
    <AnimateToken :data='root' />
  </div>
</template>