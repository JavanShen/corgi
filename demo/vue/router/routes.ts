import type { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import componentsList from '../componentsList'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../example/Overview.vue') as Component
    },
    ...componentsList.map(({ name }) => ({
        path: `/components/${name}`,
        component: () => import(`../example/${name}`) as Component
    }))
]

export default routes
