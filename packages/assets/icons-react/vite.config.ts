import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts(), react(), svgr()],
    build: {
        lib: {
            entry: resolve(__dirname, './index.tsx'),
            name: 'icons',
            fileName: 'icons'
        },
        rollupOptions: {
            external: [/@ant-design\/icons/, 'react'],
            output: {
                globals: {
                    react: 'React',
                    '@ant-design/icons/es/components/Icon': 'Icon'
                }
            }
        }
    }
})
