import { type App } from 'vue'
import Layout from './Layout.vue'
import DemoPreview from '../components/DemoPreview/index.vue'

export default {
    Layout,
    enhanceApp({ app }: { app: App }) {
        app.component('demo-preview', DemoPreview)
    }
}
