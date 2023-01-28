import type { AudioSource } from '../player'

interface AudioPlayerProps {
    source: AudioSource | null
    cover?: false | string
    title?: string
    artist?: string
    showVolumeControl?: boolean
    loaded?: () => void
}

export type { AudioPlayerProps }
