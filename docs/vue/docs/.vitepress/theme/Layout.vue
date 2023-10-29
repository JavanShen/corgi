<template>
    <ConfigProvider
        :theme="{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }"
    >
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
    </ConfigProvider>
</template>

<script setup lang="ts">
import {
    Layout,
    LayoutHeader,
    LayoutSider,
    LayoutContent,
    ConfigProvider,
    theme
} from 'ant-design-vue'
import { useData } from 'vitepress'
import CustomSidebar from '../components/CustomSidebar.vue'

import './markdown.css'

const { page, isDark } = useData()
</script>

<style scoped>
.layout {
    height: inherit;
}

.header {
    background-color: #ffffff;
    box-shadow: 0 2px 8px #f0f1f2;
    width: 100%;
    z-index: 999;
}

.content {
    padding: 20px 30px;
    background-color: #ffffff;
}
</style>

<style>
body {
    margin: 0;
}

#app {
    height: 100vh;
}
</style>
