import { defineConfig } from 'vitepress'

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
    }
})
