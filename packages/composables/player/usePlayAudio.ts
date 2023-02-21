import { onUnmounted, ref, watch } from 'vue'
import { Player, secondsToMinutes } from '@corgwn/utils'

import type { Ref } from 'vue'
import type { AudioSource } from '@corgwn/utils'

export type { AudioSource }

export default function usePlayAudio(
    source: Ref<AudioSource>,
    loaded?: () => void
) {
    const player = ref<null | Player>(new Player(source.value))

    const currentTime = ref(0)
    const currentTimeText = ref('00:00')
    const totalTime = ref(0)
    const totalTimeText = ref('00:00')
    const volume = ref<null | number>(null)
    const imageSrc = ref('')
    const title = ref('未知')
    const artist = ref('未知')

    const isPlay = ref(false)
    const isCanPlay = ref(false)
    const isManualUpdating = ref(false)

    watch(
        source,
        newSource => {
            isCanPlay.value = false
            isPlay.value = false
            player.value?.destroy()
            player.value = new Player(newSource || '')
        },
        { immediate: true }
    )

    watch(
        player,
        newPlayer => {
            newPlayer?.canPlay(() => {
                if (isCanPlay.value) return
                totalTime.value = Math.floor(player.value?.duration || 0)
                totalTimeText.value = player.value?.totalTimeText || '00:00'
                volume.value = player.value?.muted
                    ? null
                    : (player.value?.volume || 0) * 100
                isCanPlay.value = true
                loaded?.()
            })

            newPlayer?.timeUpdate(() => {
                if (!isManualUpdating.value && player.value) {
                    currentTime.value = Math.floor(player.value.currentTime)
                    currentTimeText.value = player.value.currentTimeText
                }
            })

            newPlayer?.bePaused(() => {
                isPlay.value = false
            })

            newPlayer?.audioInfo.then(res => {
                const {
                    title: t = '未知',
                    imageSrc: i = '',
                    artist: a = '未知'
                } = res || {}
                if (t) title.value = t
                if (a) artist.value = a
                imageSrc.value = i
            })
        },
        { immediate: true }
    )

    onUnmounted(() => {
        player.value?.destroy()
    })

    const play = () => {
        player.value?.play()
        isPlay.value = true
    }

    const pause = () => {
        player.value?.pause()
        isPlay.value = false
    }

    const updateTime = (val: number) => {
        isManualUpdating.value = true
        currentTime.value = val
        currentTimeText.value = secondsToMinutes(val)
    }

    const jump = (val: number) => {
        if (player.value) {
            player.value.currentTime = val
        }
        isManualUpdating.value = false
    }

    const updateVolume = (val: number) => {
        if (val > 0 && player.value?.muted) {
            player.value.unmute()
        }
        player.value?.setVolume(val)
        volume.value = val
    }

    const mute = () => {
        player.value?.mute()
        volume.value = null
    }

    const unmute = () => {
        player.value?.unmute()
        volume.value = (player.value?.volume || 0) * 100
    }

    return {
        currentTime,
        totalTime,
        totalTimeText,
        play,
        pause,
        updateTime,
        jump,
        isPlay,
        imageSrc,
        title,
        artist,
        currentTimeText,
        isCanPlay,
        volume,
        updateVolume,
        mute,
        unmute
    }
}
