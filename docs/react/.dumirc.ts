import { defineConfig } from 'dumi'

export default defineConfig({
    themeConfig: {
        name: 'Corgwn',
        logo: 'https://github.com/JavanShen/corgi/blob/main/packages/assets/pic/corgi.png?raw=true',
        socialLinks: {
            github: 'https://github.com/JavanShen/corgi'
        }
    },
    favicons: [
        'https://github.com/JavanShen/corgi/blob/main/packages/assets/pic/corgi.png?raw=true'
    ],
    autoAlias: false,
    extraBabelPresets: ['@emotion/babel-preset-css-prop'],
    theme: {
        '@c-primary': '#e0b55b'
    }
})
