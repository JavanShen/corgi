/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    type Obj = Record<string, unknown>
    const component: DefineComponent<Obj, Obj, unknown>
    export default component
}
