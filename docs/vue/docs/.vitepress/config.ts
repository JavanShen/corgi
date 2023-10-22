import { defineConfig } from 'vitepress'
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
    }
})
