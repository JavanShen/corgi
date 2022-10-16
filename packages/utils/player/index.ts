import * as id3 from 'id3js'
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
        const url =
            typeof source === 'string' ? source : URL.createObjectURL(source)
        super(url)
        this.source = source
        this.isCanPlay = super.canPlayType(url) === 'probably'

        URL.revokeObjectURL(url)
    }

    get audioInfo() {
        return (async () => {
            const { source } = this
            const tags =
                typeof source === 'string'
                    ? await id3.fromUrl(source)
                    : await id3.fromFile(source)
            const images = tags?.images as Image[]

            let imageSrc = ''
            if (images?.length > 0) {
                const img = images[0]
                imageSrc = `data:${img.mime};base64,${arrayBufferToBase64(
                    img.data
                )}`
            }

            return { imageSrc, ...tags }
        })()
    }

    loadedData(fn: () => void) {
        super.addEventListener('loadeddata', fn)
    }

    timeUpdate(fn: () => void) {
        super.addEventListener('timeupdate', fn)
    }

    get totalTimeText() {
        return secondsToMinutes(this.duration)
    }

    get currentTimeText() {
        return secondsToMinutes(this.currentTime)
    }
}
