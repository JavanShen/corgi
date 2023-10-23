<template>
    <Popover placement="top" overlay-class-name="volume-control">
        <template #content>
            <Slider
                :value="volume"
                :tooltip-visible="false"
                vertical
                @change="
                    val => {
                        emit('update', val as number)
                    }
                "
                class="volume-slider"
            />
        </template>
        <Button
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
                <MuteIcon v-if="isMute" aria-label="muteIcon" />
                <VolumeIcon v-else aria-label="volumeIcon" />
            </template>
        </Button>
    </Popover>
</template>
<script setup lang="ts">
import { Popover, Button, Slider } from 'ant-design-vue'
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
