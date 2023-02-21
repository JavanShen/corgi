<template>
    <a-popover placement="top" overlay-class-name="volume-control">
        <template #content>
            <a-slider
                :value="volume"
                :tooltip-visible="false"
                vertical
                @change="(val)=>{emit('update', val as number)}"
                class="volume-slider"
            />
        </template>
        <a-button
            shape="circle"
            size="large"
            type="link"
            :style="{ border: 'none', color: 'black' }"
            @click="
                () => {
                    emit('click')
                }
            "
            aria-label="volumeButton"
        >
            <template #icon>
                <mute-icon v-if="isMute" aria-label="muteIcon" />
                <volume-icon v-else aria-label="volumeIcon" />
            </template>
        </a-button>
    </a-popover>
</template>
<script setup lang="ts">
import { VolumeIcon, MuteIcon } from '@cardigan/icons'

interface VolumeProps {
    volume: number
    isMute: boolean
}

interface VolumeEmits {
    (e: 'click'): void
    (e: 'update', val: number): void
}

defineProps<VolumeProps>()
const emit = defineEmits<VolumeEmits>()
</script>
<style>
.volume-control .ant-popover-inner-content {
    padding: 10px 2px 6px 2px;
}
</style>
<style scoped>
.volume-slider {
    height: 80px;
}
</style>
