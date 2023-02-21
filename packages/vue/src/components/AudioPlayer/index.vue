<template>
    <a-card class="card">
        <div class="audio-container">
            <div class="audio-content">
                <div
                    class="title text-omission"
                    aria-label="title"
                    :title="title || id3Title"
                >
                    {{ title || id3Title }}
                </div>
                <div
                    class="sub-title text-omission"
                    aria-label="artist"
                    :title="artist || id3Artist"
                >
                    {{ artist || id3Artist }}
                </div>
                <a-slider
                    :value="currentTime"
                    :max="totalTime"
                    :tooltip-visible="false"
                    @change="(val)=>{updateTime(val as number)}"
                    @after-change="(val)=>{jump(val as number)}"
                    :disabled="!isCanPlay"
                    class="progress-bar"
                />
                <div class="flex-between">
                    <div
                        class="sub-sub-title text-omission"
                        aria-label="currentTimeText"
                    >
                        {{ currentTimeText }}
                    </div>
                    <div
                        class="sub-sub-title text-omission"
                        aria-label="totalTimeText"
                    >
                        {{ totalTimeText }}
                    </div>
                </div>
                <div class="flex-between">
                    <a-button
                        size="large"
                        type="text"
                        shape="circle"
                        :disabled="!isCanPlay"
                        :style="{ border: 'none' }"
                        :aria-label="isPlay ? 'pause' : 'play'"
                        @click="
                            () => {
                                return isPlay ? pause() : play()
                            }
                        "
                    >
                        <template #icon>
                            <pause-icon v-if="isPlay" />
                            <play-icon v-else />
                        </template>
                    </a-button>
                    <Volume
                        :volume="volume || 0"
                        :isMute="!volume"
                        @click="
                            () => {
                                return volume ? mute() : unmute()
                            }
                        "
                        @update="updateVolume"
                    />
                </div>
            </div>
            <div
                class="audio-media"
                aria-label="cover"
                v-if="(imageSrc || cover) && cover !== false"
            >
                <a-image
                    :preview="false"
                    :src="cover || imageSrc"
                    :height="175"
                    :width="175"
                ></a-image>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PlayIcon, PauseIcon } from '@cardigan/icons'
import { usePlayAudio } from '@corgwn/composables'
import type { AudioSource } from '@corgwn/types'
import Volume from './components/Volume.vue'

interface AudioPlayerProps {
    source: AudioSource | null
    cover?: false | string
    title?: string
    artist?: string
    showVolumeControl?: boolean
}

interface AudioPlayerEmits {
    (e: 'loaded'): void
}

const prop = withDefaults(defineProps<AudioPlayerProps>(), {
    source: '',
    showVolumeControl: false,
    cover: undefined,
    title: undefined,
    artist: undefined
})

const emit = defineEmits<AudioPlayerEmits>()

const {
    currentTime,
    currentTimeText,
    totalTime,
    totalTimeText,
    imageSrc,
    title: id3Title,
    artist: id3Artist,
    play,
    pause,
    updateTime,
    jump,
    isPlay,
    isCanPlay,
    volume,
    updateVolume,
    mute,
    unmute
} = usePlayAudio(
    computed(() => prop.source || ''),
    () => {
        emit('loaded')
    }
)
</script>

<style scoped>
.card {
    display: inline-flex;
    width: max-content;
}

.audio-container {
    display: flex;
    flex-flow: row nowrap;
}

.audio-content {
    display: flex;
    flex-flow: column nowrap;
    min-width: 170px;
    max-width: 200px;
    justify-content: space-between;
}

.text-omission {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.title {
    font-size: 22px;
    color: black;
    text-align: start;
}

.sub-title {
    font-size: 16px;
    color: #838383;
}

.sub-sub-title {
    font-size: 14px;
    color: #838383;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}

.audio-media {
    margin-left: 10px;
    border-radius: 5px;
    overflow: hidden;
    height: 175px;
    width: 175px;
}
</style>
