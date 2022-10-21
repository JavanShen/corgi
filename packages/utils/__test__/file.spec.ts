import { arrayBufferToBase64 } from '../file'

// @vitest-environment happy-dom

test('ArrayBuffer对象转base64', () => {
    const buffer = new ArrayBuffer(1)
    expect(arrayBufferToBase64(buffer)).toBeTypeOf('string')
})
