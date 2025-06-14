<template>
  <div class="demo">
    <h2>Streaming Markdown Demo</h2>
    
    <div class="controls">
      <button @click="simulateLLMResponse">模擬 LLM 回應</button>
      <label>
        <input 
          type="checkbox" 
          v-model="streaming"
        />
        啟用串流效果
      </label>
    </div>

    <div class="output-container">
      <StreamingMarkdown
        :content="markdownContent"
        :streaming="streaming"
        animation-duration='1s'
      />
    </div>
  </div>
</template>

<script lang='ts'>
import StreamingMarkdown from './components/AnimateMarkdown.vue'


const llmResponse = `
# Pluto

**Pluto** (minor-planet designation: *134340 Pluto*)
is a
[dwarf planet](https://en.wikipedia.org/wiki/Dwarf_planet)
in the
[Kuiper belt](https://en.wikipedia.org/wiki/Kuiper_belt).

## History

In the 1840s,
[Urbain Le Verrier](https://wikipedia.org/wiki/Urbain_Le_Verrier)
used Newtonian mechanics to predict the position of the
then-undiscovered planet
[Neptune](https://wikipedia.org/wiki/Neptune)
after analyzing perturbations in the orbit of
[Uranus](https://wikipedia.org/wiki/Uranus).

***

Just a link: www.nasa.gov.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

<details><summary>Show example</summary>


</details>

`

export default {
  name: 'App',
  components: {
    StreamingMarkdown
  },
  data() {
    return {
      markdownContent: '',
      streaming: true,
      animationDelay: 500,
      llmResponse
    }
  },
  methods: {
    simulateLLMResponse() {
      this.markdownContent = ''
      
      // 模擬 LLM 逐字回應
      let index = 0
      const interval = setInterval(() => {
        if (index < this.llmResponse.length) {
          this.markdownContent += this.llmResponse[index]
          index++
        } else {
          clearInterval(interval)
        }
      }, 10) // 每 20ms 添加一個字符
    },
  },

  mounted() {
    // 組件載入時自動開始演示
    setTimeout(() => {
      this.simulateLLMResponse()
    }, 500)
  }
}
</script>

<style scoped>
.demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.controls button {
  padding: 8px 16px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: #005999;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.controls input[type="range"] {
  width: 80px;
}

.output-container {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  min-height: 200px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>