import { useState, useRef, useEffect } from 'react'
import { Player, secondsToMinutes } from '@corgii/utils'

import type { Source } from '@corgii/types'

export default function usePlayAudio(source: Source, loaded?: () => void) {
    const [player, setPlayer] = useState<null | Player>(null)

    const [currentTime, setCurrentTime] = useState(0)
    const [currentTimeText, setCurrentTimeText] = useState('00:00')
    const [totalTime, setTotalTime] = useState(0)
    const [totalTimeText, setTotalTimeText] = useState('00:00')
    const [imageSrc, setImageSrc] = useState('')
    const [title, setTitle] = useState('未知')
    const [artist, setArtist] = useState('未知')

    const [isPlay, setIsPlay] = useState(false)
    const [isCanPlay, setIsCanPlay] = useState(false)
    const isManualUpdating = useRef(false)

    useEffect(() => {
        setPlayer(preVal => {
            setIsCanPlay(false)
            setIsPlay(false)
            preVal?.destroy()
            return new Player(source || '')
        })
    }, [source])

    useEffect(() => {
        player?.canPlay(() => {
            setTotalTime(Math.floor(player.duration || 0))
            setTotalTimeText(player.totalTimeText || '00:00')
            setIsCanPlay(true)
            loaded?.()
        })

        player?.timeUpdate(() => {
            if (!isManualUpdating.current && player) {
                setCurrentTime(Math.floor(player.currentTime))
                setCurrentTimeText(player.currentTimeText)
            }
        })

        player?.bePaused(() => {
            setIsPlay(false)
        })

        player?.audioInfo.then(res => {
            const { title: t, imageSrc: i, artist: a } = res || {}
            if (t) setTitle(t)
            if (a) setArtist(a)
            if (i) setImageSrc(i)
        })
    }, [player])

    const play = () => {
        player?.play()
        setIsPlay(true)
    }

    const pause = () => {
        player?.pause()
        setIsPlay(false)
    }

    const updateTime = (val: number) => {
        if (!isManualUpdating.current) isManualUpdating.current = true
        setCurrentTime(val)
        setCurrentTimeText(secondsToMinutes(val))
    }

    const jump = (val: number) => {
        if (player) {
            player.currentTime = val
        }
        isManualUpdating.current = false
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
        isCanPlay
    }
}
