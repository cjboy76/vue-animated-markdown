<script setup lang='ts'>
import type { StreamingToken } from '../shared.types';

interface ChunkProps {
    tagName: string,
    transition?: string
    children?: StreamingToken[]
}

const props = withDefaults(defineProps<ChunkProps>(), {
    transition: 'list'
})


</script>

<template>
    <TransitionGroup :tag='props.tagName' :name='props.transition'>
        <component v-for='(child, index) of children' :is='child.tag' :key='index'>{{ child.content || '' }}</component>
    </TransitionGroup>
</template>