import { URL } from 'node:url'
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM()
const audio = jsdom.window.document.createElement('audio')

globalThis.URL = URL as unknown as typeof globalThis.URL

class MyAudio {
    audio: HTMLAudioElement

    constructor(url: string) {
        this.audio = audio
        this.audio.src = url
    }

    get muted() {
        return this.audio.muted
    }

    set muted(val: boolean) {
        this.audio.muted = val
    }

    get volume() {
        return this.audio.volume
    }

    set volume(val: number) {
        this.audio.volume = val
    }

    get src() {
        return this.audio.src
    }

    set src(val: string) {
        this.audio.src = val
    }

    get duration() {
        return this.audio.duration
    }

    get currentTime() {
        return this.audio.currentTime
    }

    set currentTime(val: number) {
        this.audio.currentTime = val
    }

    remove() {
        this.audio.remove()
    }

    play() {
        this.audio.dispatchEvent(new Event('play'))
    }

    pause() {
        this.audio.dispatchEvent(new Event('pause'))
    }

    canPlayType(url: string) {
        return this.audio.canPlayType(url)
    }

    addEventListener(event: string, fn: (...arg: unknown[]) => unknown) {
        this.audio.addEventListener(event, fn)
    }
}

globalThis.Audio = MyAudio as unknown as new (
    src?: string | undefined
) => HTMLAudioElement
