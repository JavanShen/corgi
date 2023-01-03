import { fromFile, fromUrl } from 'id3js'
import type { Source } from '@corgi/types'
import { secondsToMinutes } from '../time'
import { arrayBufferToBase64 } from '../file'

interface Image {
    type: string
    description: string
    mime: string
    data: ArrayBuffer
}

export default class Player extends Audio {
    source: Source

    isCanPlay: boolean

    constructor(source: Source) {
        /* eslint no-nested-ternary: "off" */
        const url =
            typeof source === 'string'
                ? source
                : /^audio\//.test(source?.type)
                ? URL.createObjectURL(source)
                : ''
        super(url)
        this.source = source
        this.isCanPlay = super.canPlayType(url) === 'probably'

        super.addEventListener('canplay', () => {
            URL.revokeObjectURL(url)
        })
    }

    get audioInfo() {
        return (async () => {
            try {
                const { source } = this
                const tags =
                    typeof source === 'string'
                        ? await fromUrl(source)
                        : await fromFile(source)
                const images = tags?.images as Image[]

                let imageSrc = ''
                if (images?.length > 0) {
                    const img = images[0]
                    imageSrc = `data:${img.mime};base64,${arrayBufferToBase64(
                        img.data
                    )}`
                }

                return { imageSrc, ...tags }
            } catch (e) {
                return {}
            }
        })()
    }

    loadedData(fn: () => void) {
        super.addEventListener('loadeddata', fn)
    }

    timeUpdate(fn: () => void) {
        super.addEventListener('timeupdate', fn)
    }

    canPlay(fn: () => void) {
        super.addEventListener('canplaythrough', fn)
    }

    bePaused(fn: () => void) {
        super.addEventListener('pause', fn)
    }

    onEnded(fn: () => void) {
        super.addEventListener('ended', fn)
    }

    destroy() {
        super.pause()
        super.src = ''
        super.remove()
    }

    get totalTimeText() {
        return secondsToMinutes(this.duration)
    }

    get currentTimeText() {
        return secondsToMinutes(this.currentTime)
    }
}
