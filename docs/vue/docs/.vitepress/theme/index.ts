import { type App } from 'vue'
import Layout from './Layout.vue'

export default {
    Layout,
    enhanceApp({ app }: { app: App }) {
        app.component('demo')
    }
}
