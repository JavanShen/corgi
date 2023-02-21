<template>
    <a-space direction="vertical">
        <a-upload
            :before-upload="beforeUpload"
            :custom-request="() => {}"
            :show-upload-list="false"
        >
            <a-button>选择文件</a-button>
        </a-upload>
        <audio-player :source="file" show-volume-control />
    </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { AudioPlayer } from '@corgwn/vue'

const file = ref<null | File>(null)

const beforeUpload = async (val: File) => {
    file.value = val
}
</script>
