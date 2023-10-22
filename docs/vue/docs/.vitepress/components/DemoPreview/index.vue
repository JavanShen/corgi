<template>
    <Card class="container">
        <section><slot></slot></section>
        <Divider orientation="left">{{ title }}</Divider>
        <div class="description">
            {{ description }}
        </div>
        <Divider dashed />
        <div class="actions">
            <Space size="large">
                <Tooltip title="在statk 打开"></Tooltip>
                <Tooltip
                    class="action-btn"
                    :title="`切换到 ${isJs ? 'TypeScript' : 'JavaScript'}`"
                    @click="isJs = !isJs"
                >
                    <span class="language-switch">
                        {{ isJs ? 'TS' : 'JS' }}
                    </span>
                </Tooltip>
                <Tooltip class="action-btn" title="复制代码">
                    <CopyOutlined @click="copyCode" />
                </Tooltip>
                <Tooltip
                    class="action-btn"
                    :title="isShowCode ? '隐藏代码' : '显示代码'"
                    @click="isShowCode = !isShowCode"
                >
                    <ShrinkOutlined v-if="isShowCode" />
                    <ArrowsAltOutlined v-else />
                </Tooltip>
            </Space>
        </div>
        <div
            v-if="isShowCode"
            :class="['language-vue', isDark ? 'dark-mode' : 'light-mode']"
            v-html="isJs ? showJSSourceCode : showSourceCode"
        ></div>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card, Divider, Space, Tooltip, message } from 'ant-design-vue'
import {
    ArrowsAltOutlined,
    ShrinkOutlined,
    CopyOutlined
} from '@ant-design/icons-vue'
import { useData } from 'vitepress'
import useClipboard from 'vue-clipboard3'

export type DemoPreviewProps = {
    code: string
    showCode: string
    title: string
    description: string
    JSCode: string
    showJSCode: string
}

const { isDark } = useData()
const isJs = ref(false)

const props = withDefaults(defineProps<DemoPreviewProps>(), {
    title: '',
    description: ''
})

const showSourceCode = decodeURIComponent(props.showCode)
const showJSSourceCode = decodeURIComponent(props.showJSCode)
const sourceCode = decodeURIComponent(props.code)
const JSSourceCode = decodeURIComponent(props.JSCode)

const isShowCode = ref(false)

const { toClipboard } = useClipboard()
const copyCode = async () => {
    try {
        await toClipboard(isJs.value ? JSSourceCode : sourceCode)
        message.success('复制成功')
    } catch (e) {
        message.error('复制失败')
    }
}
</script>

<style scoped>
.actions {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
}

.dark-mode :deep(.vp-code-light) {
    display: none;
}

.light-mode :deep(.vp-code-dark) {
    display: none;
}

.language-switch {
    cursor: pointer;
    font-weight: 500;
}

.language-vue {
    margin-top: 16px;
}

.action-btn {
    transform: scale(1);
    transition: transform 0.3s ease;
}
.action-btn:hover {
    transform: scale(1.2);
}
</style>
