<template>
    <Menu
        mode="inline"
        :style="{ height: '100%' }"
        v-model:selectedKeys="selectedKeys"
        @select="handleSelect"
    >
        <MenuItemGroup
            v-for="group in theme.sidebar"
            :key="group.text"
            :title="group.text"
        >
            <MenuItem v-for="item in group.items" :key="item.link">{{
                item.text
            }}</MenuItem>
        </MenuItemGroup>
    </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, MenuItemGroup, MenuItem } from 'ant-design-vue'
import { useData, useRouter } from 'vitepress'
import type { SelectInfo } from 'ant-design-vue/es/menu/src/interface'
import type { DefaultTheme } from 'vitepress'

const { theme } = useData<DefaultTheme.Config>()

const router = useRouter()

const selectedKeys = ref<string[]>([])

const handleSelect = ({ key }: SelectInfo) => {
    router.go(key as string)
}
</script>
