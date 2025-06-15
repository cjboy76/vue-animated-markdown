<script lang='ts'>
type Seperator = 'word' | 'character'

export type AnimatedMarkdownContext = {
  seperator: Seperator
  transition: string
}

export const AnimatedMarkdownProviderKey = Symbol('vue-animated-markdown')
</script>

<script setup lang='ts'>
import type { Nodes } from 'hast'
import remarkParse from 'remark-parse'
import remarkRehype, { type Options } from 'remark-rehype'
import { type PluggableList, unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import { provide, shallowRef, watch } from 'vue'
import AnimateToken from './AnimatedToken.vue'

defineOptions({
  name: 'AnimateMarkdown',
})

const props = withDefaults(defineProps<{
  content: string
  transition: string
  seperator?: Seperator
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
  remarkRehypeOptions?: Options
}>(), {
  seperator: 'word',
})

const processor = unified()
  .use(remarkParse)
  .use(props.remarkPlugins || [])
  .use(remarkRehype, { ...(props.remarkRehypeOptions || {}) })
  .use(props.rehypePlugins || [])

async function transformAst(input: string) {
  const parseTree = processor.parse(input)
  const tree = await processor.run(parseTree)
  removePosition(tree, { force: true })
  return tree
}

provide<AnimatedMarkdownContext>(AnimatedMarkdownProviderKey, {
  seperator: props.seperator,
  transition: props.transition,
})

const root = shallowRef<Nodes>()

watch(() => props.content, async (content) => {
  root.value = content ? await transformAst(content) : undefined
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <AnimateToken :data="root" />
  </div>
</template>
