import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import CustomComponent from './CustomComponent.vue'

const app = createApp(App)
app.component('CustomComponent', CustomComponent)
app.mount('#app')
