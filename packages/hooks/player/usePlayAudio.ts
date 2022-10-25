import { Player, secondsToMinutes } from '@corgi/utils'

import type { SyntheticEvent } from 'react'
import type { Source } from '@corgi/types'

export default function usePlayAudio(source: Source, loaded?: () => void) {
    const [player] = useState(new Player(source))

    const [currentTime, setCurrentTime] = useState(0)
    const [currentTimeText, setCurrentTimeText] = useState('00:00')
    const [totalTime, setTotalTime] = useState(0)
    const [totalTimeText, setTotalTimeText] = useState('00:00')
    const [imageSrc, setImageSrc] = useState('')
    const [title, setTitle] = useState('未知')
    const [artist, setArtist] = useState('未知')

    const [isPlay, setIsPlay] = useState(false)
    const isManualUpdating = useRef(false)

    useEffect(() => {
        player.loadedData(() => {
            setTotalTime(Math.floor(player.duration || 0))
            setTotalTimeText(player.totalTimeText || '00:00')
            loaded?.()
        })

        player.timeUpdate(() => {
            if (!isManualUpdating.current && player) {
                setCurrentTime(Math.floor(player.currentTime))
                setCurrentTimeText(player.currentTimeText)
            }
        })

        player.audioInfo.then(res => {
            const { title: t, imageSrc: i, artist: a } = res
            if (t) setTitle(t)
            if (a) setArtist(a)
            if (i) setImageSrc(i)
        })
    }, [])

    const play = () => {
        player.play()
        setIsPlay(true)
    }

    const pause = () => {
        player.pause()
        setIsPlay(false)
    }

    const updateTime = (_event: Event, val: number | number[]) => {
        if (!isManualUpdating.current) isManualUpdating.current = true
        setCurrentTime(val as number)
        setCurrentTimeText(secondsToMinutes(val as number))
    }

    const jump = (_event: Event | SyntheticEvent, val: number | number[]) => {
        if (player) {
            player.currentTime = val as number
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
        currentTimeText
    }
}
