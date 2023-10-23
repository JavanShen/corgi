import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: resolve(__dirname, './tsconfig.json'),
            outDir: [resolve(__dirname, 'es'), resolve(__dirname, 'lib')]
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'utils',
            fileName: 'utils'
        },
        rollupOptions: {
            external: ['@corgwn/types'],
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    dir: 'es'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    dir: 'lib'
                }
            ]
        }
    }
})
