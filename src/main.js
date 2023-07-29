import {
    createApp
} from 'vue'
import './style.css'
import plugins from './plugins'
import App from './App.vue'

createApp(App).use(plugins).mount('#app')