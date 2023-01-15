import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            tsConfigFilePath: resolve(__dirname, './tsconfig.json'),
            outputDir: [resolve(__dirname, 'es'), resolve(__dirname, 'lib')],
            insertTypesEntry: true
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'utils',
            fileName: 'utils'
        },
        rollupOptions: {
            external: ['id3js'],
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'es'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'lib'
                }
            ]
        }
    }
})
