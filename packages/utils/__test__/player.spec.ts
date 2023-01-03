import { expect, describe, it } from 'vitest'
import Player from '../player'

const link =
    'https://m10.music.126.net/20230103150836/873cf52ab7ce26a45779eacda1fefc30/ymusic/8fbd/c108/0af7/1336bcac832347940e9ca752e7927492.mp3'

// @vitest-environment jsdom
describe('音频播放器', () => {
    const playerWithLink = new Player(link)

    it('返回HTMLAudioElement接口', () => {
        expect(playerWithLink).toBeInstanceOf(HTMLAudioElement)
    })
})
