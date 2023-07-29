import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  VitePWA
} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      injectRegister: 'inline',
      injectManifest: 'inline',
      enabled: true
    }
  }), vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': '/src'
    }
  }
})