import { expect, describe, it } from 'vitest'
import { path, link } from '@corgi/demo/AudioPlayer/source'
import Player from '../player'

// @vitest-environment jsdom
describe('音频播放器', () => {
    const playerWithLink = new Player(link)
    const playerWithPath = new Player(path)

    it('返回HTMLAudioElement接口', () => {
        expect(playerWithLink).toBeInstanceOf(HTMLAudioElement)
        expect(playerWithPath).toBeInstanceOf(HTMLAudioElement)
    })
})
