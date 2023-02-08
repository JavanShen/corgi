import { expect, it, describe, vi } from 'vitest'
import { readFile } from 'fs/promises'
import {
    arrayBufferToBase64,
    fileToBlob,
    id3FromFile,
    id3FromUrl
} from '../file'

const blob = new Blob([await readFile('assets/demo.mp3')])

// @vitest-environment happy-dom

it('ArrayBuffer对象转base64', () => {
    const buffer = new ArrayBuffer(1)
    expect(arrayBufferToBase64(buffer)).toBeTypeOf('string')
})

it('File对象转Blob对象', async () => {
    const file = new File([], '')
    expect(await fileToBlob(file)).toBeInstanceOf(Blob)
})

describe('通过文件解析ID3标签', () => {
    it('解析成功', async () => {
        const { title, artist, album, year } = (await id3FromFile(blob)) || {}

        expect(title).toBeTypeOf('string')
        expect(artist).toBeTypeOf('string')
        expect(album).toBeTypeOf('string')
        expect(year).toBeNull()
    })

    it('浏览器不支持时报错', async () => {
        vi.stubGlobal('FileReader', undefined)

        expect(() => id3FromFile(blob)).toThrowError(
            'Browser does not have support for the File API and/or ' +
                'ArrayBuffers'
        )

        vi.unstubAllGlobals()
    })
})

describe('通过url解析ID3标签', () => {
    it('解析失败', async () => {
        expect(
            await id3FromUrl(
                'https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm'
            )
        ).toBeNull()
    })
})
