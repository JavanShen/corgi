<template>
    <div class="container">
        <section><slot></slot></section>
    </div>
</template>

<script setup lang="ts">
export type DemoPreviewProps = {
    code: string
    showCode: string
    title: string
    description: string
}

withDefaults(defineProps<DemoPreviewProps>(), {
    title: '',
    description: ''
})
</script>
