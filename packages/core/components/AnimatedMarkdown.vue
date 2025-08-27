<script lang='ts'>
type Seperator = 'word' | 'character'

export type AnimatedMarkdownContext = Ref<{
  seperator: Seperator
  transition: string
}>

export const AnimatedMarkdownProviderKey = Symbol('vue-animated-markdown')
</script>

<script setup lang='ts'>
import type { Nodes } from 'hast'
import remarkParse from 'remark-parse'
import remarkRehype, { type Options } from 'remark-rehype'
import { type PluggableList, unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import { provide, ref, type Ref, shallowRef, watch } from 'vue'
import AnimatedContent from './AnimatedContent.vue'

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

const context = ref({
  seperator: props.seperator,
  transition: props.transition,
})

// Watch for prop changes
watch(() => props.transition, (newTransition) => {
  context.value.transition = newTransition
})

watch(() => props.seperator, (newSeperator) => {
  context.value.seperator = newSeperator
})

provide<AnimatedMarkdownContext>(AnimatedMarkdownProviderKey, context)

const root = shallowRef<Nodes>()

watch(() => props.content, async (content) => {
  root.value = content ? await transformAst(content) : undefined
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <AnimatedContent :data="root" />
  </div>
</template>
