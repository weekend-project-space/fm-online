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
    includeAssets: ['logo.png', 'logo-min.png'],
    manifest: {
      name: '01234FM',
      short_name: 'FM',
      description: 'FM Online',
      theme_color: '#ffffff',
      icons: [{
        src: 'logo.png',
        sizes: '64x64',
        type: 'image/png'
      }, ]
    },
    registerType: 'autoUpdate',
    devOptions: {
      // injectRegister: 'inline',
      // injectManifest: 'inline',
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