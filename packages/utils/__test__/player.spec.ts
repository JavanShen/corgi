import { describe, it, expect } from 'vitest'
import { readFile } from 'fs/promises'
import Player from '../player'

const blob = new Blob([await readFile('assets/demo.mp3')])

// @vitest-environment jsdom
describe('音频播放器', async () => {
    const playerWithBlob = new Player(blob)

    it('ID3 解析', async () => {
        const { title, artist, album, year, imageSrc } =
            (await playerWithBlob.audioInfo) || {}
        expect(title).toBeTypeOf('string')
        expect(artist).toBeTypeOf('string')
        expect(album).toBeTypeOf('string')
        expect(year).toBeNull()
        expect(imageSrc).toBeTypeOf('string')
    })
})
