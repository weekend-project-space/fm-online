import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  VitePWA
} from 'vite-plugin-pwa'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    vuetify({
      autoImport: true
    }),
    VitePWA({
      includeAssets: ['logo.png', 'logo-min.png', 'logo.svg'],
      manifest: {
        name: 'FM',
        short_name: 'FM',
        description: 'FM Online',
        theme_color: '#ffffff',
        icons: [{
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: "inline",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,json}'],
      }
    }),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': '/src'
    }
  }
})