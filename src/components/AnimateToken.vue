<script setup lang='ts'>
import type { Nodes } from 'hast';
import { computed, inject } from 'vue';
import { providerSymbol, type AnimationMarkdownContext } from './AnimateMarkdown.vue';

interface Props {
    data: Nodes | undefined
}

defineOptions({
    name: 'AnimateToken'
})

const context = inject<AnimationMarkdownContext>(providerSymbol)
const props = defineProps<Props>()

const splitTexts = computed(() => {
    if (!props.data || props.data.type !== "text") return []
    const seperator = context?.seperator || 'word'
    const splitRegex = seperator === 'word' ? /(\s+)/ : /(.)/
    return props.data.value.replace('\n', ' ').split(splitRegex)
})
</script>

<template>
    <template v-if='!data'></template>
    <template v-else-if='data.type === "text"'>
        <TransitionGroup tag='span' :name='context?.transition'>
            <span v-for='(value, index) of splitTexts' :key='index'>{{ value }}</span>
        </TransitionGroup>
    </template>
    <template v-else-if='data.type === "element" || data.type === "root"'>
        <TransitionGroup :tag='data.type === "root" ? "div" : data.tagName' :name='context?.transition'>
            <AnimateToken v-for='(child, index) of data.children' :key='index' :data='child'  />
        </TransitionGroup>
    </template>
</template>