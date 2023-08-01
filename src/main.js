import {
    createApp
} from 'vue'
import './style.less'
import plugins from './plugins'
import App from './App.vue'

createApp(App).use(plugins).mount('#app')