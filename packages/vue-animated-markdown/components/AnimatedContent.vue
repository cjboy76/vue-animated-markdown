<script setup lang='ts'>
import type { Nodes } from 'hast'
import { computed, inject } from 'vue'
import { type AnimatedMarkdownContext, AnimatedMarkdownProviderKey } from './AnimatedMarkdown.vue'
import AnimatedText from './AnimatedText.vue'

type Props = {
  data: Nodes | undefined
}

defineOptions({
  name: 'AnimatedContent',
})

const props = defineProps<Props>()
const context = inject<AnimatedMarkdownContext>(AnimatedMarkdownProviderKey)
const splitText = computed(() => {
  if (!props.data || props.data.type !== 'text')
    return []
  const seperator = context?.seperator || 'word'
  const splitRegex = seperator === 'word' ? /(\s+)/ : /(.)/
  return props.data.value.split('\n').map((line) => {
    return {
      line,
      children: line.split(splitRegex),
    }
  })
})
</script>

<template>
  <template v-if="!data" />
  <template v-else-if="data.type === 'text'">
    <AnimatedText v-for="(line, lineIndex) of splitText" :key="lineIndex" :data="line.children" />
  </template>
  <component :is="data.tagName" v-else-if="data.type === 'element'" :name="context?.transition" v-bind="data.properties">
    <AnimatedContent v-for="(element, elementIndex) of data.children" :key="elementIndex" :data="element" />
  </component>
  <div v-else-if="data.type === 'root'">
    <AnimatedContent v-for="(element, elementIndex) of data.children" :key="elementIndex" :data="element" />
  </div>
</template>
