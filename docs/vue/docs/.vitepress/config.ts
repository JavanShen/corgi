import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { componentPreview, containerPreview } from './plugin/core'

export default defineConfig({
    title: 'Corgwn',
    themeConfig: {
        sidebar: [
            {
                text: '组件',
                items: [
                    {
                        text: '音频播放器',
                        link: '/components/AudioPlayer'
                    }
                ]
            }
        ]
    },
    markdown: {
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        }
    },
    vite: {
        plugins: [vueJsx(), svgLoader()]
    }
})
