<template>
    <n-card hoverable>
        <n-slider
            :value="currentTime"
            :max="totalTime"
            :tooltip="false"
            @update-value="updateTime"
        />
        <span>{{ totalTimeText }}</span>
        <n-button @click="play">开始</n-button>
        <n-button @click="pause">暂停</n-button>
    </n-card>
</template>

<script setup lang="ts">
import { usePlayAudio } from '@corgii/composables'
import type { Source } from '@corgii/types'

interface Props {
    source: Source
}

const props = withDefaults(defineProps<Props>(), {
    source: ''
})

const { currentTime, totalTime, totalTimeText, play, pause, updateTime } =
    usePlayAudio(props.source)
</script>
