import { defineConfig } from 'cypress'

export default defineConfig({
    projectId: '6jecso',
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite'
        }
    }
})
