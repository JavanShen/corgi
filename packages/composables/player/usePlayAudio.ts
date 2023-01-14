import { Player } from '@corgii/utils'
import type { Source } from '@corgii/utils'
import debounce from 'lodash/debounce'

export type { Source }

export default function usePlayAudio(source: Source) {
    const currentTime = ref(0)
    const totalTime = ref(0)
    const totalTimeText = ref('00:00')
    const isManualUpdating = ref(false)

    const player = new Player(source)

    player.loadedData(() => {
        totalTime.value = Math.floor(player.duration)
        totalTimeText.value = player.totalTimeText
    })

    player.timeUpdate(() => {
        if (!isManualUpdating.value) {
            currentTime.value = Math.floor(player.currentTime)
        }
    })

    const play = () => {
        player.play()
    }

    const pause = () => {
        player.pause()
    }

    const updateAudioTime = debounce((val: number) => {
        player.currentTime = val
    }, 500)
    const updateTime = (val: number) => {
        isManualUpdating.value = true
        currentTime.value = val
        updateAudioTime(val)
        isManualUpdating.value = false
    }

    return {
        currentTime,
        totalTime,
        totalTimeText,
        play,
        pause,
        updateTime
    }
}
