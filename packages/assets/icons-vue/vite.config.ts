import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts(), vue(), vueJsx(), svgLoader()],
    build: {
        lib: {
            entry: resolve(__dirname, 'index.tsx'),
            name: 'icons',
            fileName: 'icons'
        },
        rollupOptions: {
            external: [/@ant-design\/icons-vue/, 'vue'],
            output: {
                globals: {
                    vue: 'Vue',
                    '@ant-design/icons-vue': 'Icon'
                }
            }
        }
    }
})
