import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dts: resolve(__dirname, '../../'),
            resolvers: [AntDesignVueResolver()]
        }),
        svgLoader()
    ]
})
