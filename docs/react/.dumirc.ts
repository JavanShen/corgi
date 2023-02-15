import { defineConfig } from 'dumi'

export default defineConfig({
    themeConfig: {
        name: 'Corgwn',
        logo: '/corgi.png',
        socialLinks: {
            github: 'https://github.com/JavanShen/corgi'
        }
    },
    favicons: ['/corgi.png'],
    autoAlias: false,
    extraBabelPresets: ['@emotion/babel-preset-css-prop'],
    theme: {
        '@c-primary': '#e0b55b'
    }
})
