import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: resolve(__dirname, './tsconfig.json'),
            outDir: [resolve(__dirname, 'es'), resolve(__dirname, 'lib')],
            exclude: ['cypress', 'node_modules/**', 'global.d.ts']
        }),
        react(),
        svgr()
    ],
    server: {
        fs: {
            strict: false
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'components',
            fileName: 'components'
        },
        rollupOptions: {
            external: [
                'react',
                'antd',
                'react-transition-group',
                '@pembroke/icons',
                /@corgwn/,
                /@emotion/
            ],
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'es',
                    globals: {
                        react: 'React',
                        antd: 'antd'
                    }
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'lib',
                    globals: {
                        react: 'React',
                        antd: 'antd'
                    }
                }
            ]
        }
    }
})
