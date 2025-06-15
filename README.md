# vue-animated-markdown

Vue component to render animated markdown for LLM text streaming with fully customized transitions

## Demo

Visit demo: [demo link](https://cjboy76.github.io/vue-animated-markdown/)

## Features

- 🎭 **Text Animation** - Animate markdown content by word or character
- 🔌 **Plugin System** - Supports remark and rehype plugins for markdown processing
- ⚡️ **Vue Transitions** - Uses Vue's built-in transition system for smooth animations

## Installation

```
npm install vue-animated-markdown
```

## Usage

```html
<script setup lang="ts">
  import { AnimatedMarkdown } from 'vue-animated-markdown'
</script>

<template>
  <div>
    <AnimatedMarkdown content="# Hello World" seperator="word" transition="fade-in" />
  </div>
</template>

<style scoped>
/* Make your own transition here! */
:deep(.fade-in-enter-active) {
  transition: all 1s ease;
}

:deep(.fade-in-enter-from) {
  opacity: 0;
  transform: translateY(10px);
}
</style>
```

## Usage with remark plugins

Find good plugins here: [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins)

```html
<script setup lang="ts">
  import remarkGfm from 'remark-gfm'
  import { AnimatedMarkdown } from 'vue-animated-markdown'

  const content = '....'
  const remarkPlugins = [remarkGfm] // remark plugin to support GFM
</script>

<template>
  <div>
    <AnimatedMarkdown 
      :content="content" 
      seperator="word" 
      transition="fade-in" 
      :remark-plugins='remarkPlugins' 
    />
  </div>
</template>
```

## `<AnimatedMarkdown />` Component

### Props

| Prop                | Type                        | Default | Description                                                                      |
|--------------------|----------------------------|---------|----------------------------------------------------------------------------------|
| content            | `string`                   | —       | The markdown text to render and animate.                                         |
| transition         | `string`                   | —       | The name of a Vue transition to apply to each animated token.                    |
| seperator          | `'word'` \| `'character'`  | `'word'`| Controls how the animation splits the text: by word or by character.             |
| remarkPlugins      | `PluggableList`           | `[]`    | Array of remark plugins to transform markdown.                                   |
| rehypePlugins      | `PluggableList`           | `[]`    | Array of rehype plugins to transform HTML.                                       |
| remarkRehypeOptions| `Options`                 | `{}`    | Options to pass to remark-rehype during markdown to HTML transformation.         |

## TODO

- [ ] **Avoid Re-rendering** - Implement optimization to prevent unnecessary re-renders during animation
- [ ] **Custom HTML Components** - Add support for custom Vue components in markdown content

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, improvements, or new features.

## License

This project is licensed under the [MIT License](./LICENSE).
