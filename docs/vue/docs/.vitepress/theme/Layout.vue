<template>
    <Layout class="layout">
        <LayoutHeader class="header"></LayoutHeader>
        <Layout>
            <LayoutSider width="200">
                <CustomSidebar />
            </LayoutSider>
            <Layout>
                <LayoutContent class="content">
                    <div v-if="page.isNotFound">404</div>
                    <content class="markdown-body" v-else />
                </LayoutContent>
            </Layout>
        </Layout>
    </Layout>
</template>

<script setup lang="ts">
import {
    Layout,
    LayoutHeader,
    LayoutSider,
    LayoutContent
} from 'ant-design-vue'
import { useData } from 'vitepress'
import CustomSidebar from '../components/CustomSidebar.vue'

import './markdown.css'

const { page } = useData()
</script>

<style scoped>
.layout {
    height: inherit;
}

.header {
    background-color: #ffffff;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 999;
}

.content {
    padding: 20px 30px;
    background-color: #ffffff;
}
</style>

<style>
#app {
    height: 100vh;
}
</style>
