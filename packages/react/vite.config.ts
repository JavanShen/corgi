import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            entryRoot: resolve(__dirname, 'src'),
            tsConfigFilePath: resolve(__dirname, './tsconfig.json'),
            outputDir: [resolve(__dirname, 'es'), resolve(__dirname, 'lib')]
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
                'React',
                'ReactDOM',
                'antd',
                '@emotion/react',
                '@emotion/styled'
            ],
            input: [resolve(__dirname, './index.ts')],
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
