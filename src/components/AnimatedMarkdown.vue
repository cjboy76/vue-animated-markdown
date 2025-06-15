<script lang='ts'>
type Seperator = 'word' | 'character'

export interface AnimatedMarkdownContext {
  seperator: Seperator
  transition: string
}

export const providerSymbol = Symbol('animate-markdown')
</script>

<script setup lang='ts'>
import type { Nodes } from 'hast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import { provide, shallowRef, watch } from 'vue'
import AnimateToken from './AnimatedToken.vue'

interface Props {
  content: string
  seperator?: Seperator
  transition?: string
}

defineOptions({
  name: 'AnimateMarkdown',
})

const props = withDefaults(defineProps<Props>(), {
  seperator: 'word',
  transition: '',
})

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })

async function transformAst(input: string) {
  const parseTree = processor.parse(input)
  const tree = await processor.run(parseTree)
  removePosition(tree, { force: true })
  return tree
}

provide<AnimatedMarkdownContext>(providerSymbol, {
  seperator: props.seperator,
  transition: props.transition,
})

const root = shallowRef<Nodes>()

watch(() => props.content, async (content) => {
  root.value = content ? await transformAst(content) : undefined
})
</script>

<template>
  <div>
    <AnimateToken :data="root" />
  </div>
</template>
