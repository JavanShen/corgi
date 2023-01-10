import { expect, it } from 'vitest'
import { arrayBufferToBase64, fileToBlob } from '../file'

// @vitest-environment happy-dom

it('ArrayBuffer对象转base64', () => {
    const buffer = new ArrayBuffer(1)
    expect(arrayBufferToBase64(buffer)).toBeTypeOf('string')
})

it('File对象转Blob对象', async () => {
    const file = new File([], '')
    expect(await fileToBlob(file)).toBeInstanceOf(Blob)
})
