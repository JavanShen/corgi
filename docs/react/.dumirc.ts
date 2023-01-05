import { defineConfig } from 'dumi'

export default defineConfig({
    themeConfig: {
        name: 'Corgii',
        logo: '/corgi.png'
    },
    favicons: ['/corgi.png'],
    autoAlias: false,
    theme: {
        '@c-primary': '#e0b55b'
    }
})
