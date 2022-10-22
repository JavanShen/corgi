import { expect, it } from 'vitest'
import { arrayBufferToBase64 } from '../file'

// @vitest-environment happy-dom

it('ArrayBuffer对象转base64', () => {
    const buffer = new ArrayBuffer(1)
    expect(arrayBufferToBase64(buffer)).toBeTypeOf('string')
})
