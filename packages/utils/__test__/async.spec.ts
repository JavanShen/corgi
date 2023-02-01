import { describe, it, expect } from 'vitest'
import { catchErr } from '../async'

describe('catchErr', () => {
    it('异步执行成功', async () => {
        expect(
            await catchErr(
                new Promise(res => {
                    res('success')
                })
            )
        ).toStrictEqual([null, 'success'])
    })

    it('异步执行失败', async () => {
        expect(
            await catchErr(
                new Promise((_, rej) => {
                    rej(new Error('fail'))
                })
            )
        ).toStrictEqual([new Error('fail'), undefined])

        expect(
            await catchErr(
                new Promise((_, rej) => {
                    rej(new Error('fail'))
                }),
                { code: 500 }
            )
        ).toStrictEqual([{ code: 500 }, undefined])
    })
})
