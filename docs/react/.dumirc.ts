import { defineConfig } from 'dumi'

export default defineConfig({
    themeConfig: {
        name: 'Corgwn',
        logo: '/corgi.png'
    },
    favicons: ['/corgi.png'],
    autoAlias: false,
    extraBabelPresets: ['@emotion/babel-preset-css-prop'],
    theme: {
        '@c-primary': '#e0b55b'
    }
})
