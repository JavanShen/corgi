import type { Source } from '../player'

interface AudioPlayerProps {
    source: Source | null
    cover?: false | string
    title?: string
    artist?: string
    showVolumeControl?: boolean
    loaded?: () => void
}

export type { AudioPlayerProps }
