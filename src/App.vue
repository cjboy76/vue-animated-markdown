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
        ref="streamingMarkdown"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import StreamingMarkdown from './components/StreamingMarkdown.vue'


const llmResponse = `
# 關於 Vue.js 的介紹

Vue.js 是一個**漸進式**的 JavaScript 框架，用於構建用戶界面。

## 主要特點

- **響應式數據綁定**：自動追蹤依賴關係
- **組件化開發**：可複用的 UI 組件
- **虛擬 DOM**：高效的更新機制

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
      }, 100) // 每 20ms 添加一個字符
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