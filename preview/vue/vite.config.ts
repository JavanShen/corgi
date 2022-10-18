import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        Components({
            dts: '../../components.d.ts',
            resolvers: [NaiveUiResolver()]
        }),
        AutoImport({
            imports: ['vue'],
            dts: '../../auto-imports-vue.d.ts',
            vueTemplate: true
        })
    ]
})
