import { describe, it, expect, vi } from 'vitest'
import { EventEmitter } from '../designPattern'

/* eslint-disable @typescript-eslint/no-empty-function */

describe('EventEmitter', () => {
    const eventEmitter = new EventEmitter()

    it('订阅发布', () => {
        const fn1 = vi.fn(() => {})
        const fn2 = vi.fn(() => {})

        eventEmitter.subscribe('basic', fn1)
        eventEmitter.subscribe('basic', fn2)
        eventEmitter.emit('basic')

        expect(fn1).toHaveBeenCalledTimes(1)
        expect(fn2).toHaveBeenCalledTimes(1)
    })

    describe('返回参数', () => {
        it('单个订阅', () => {
            const fn = vi.fn(() => 'success')

            eventEmitter.subscribe('return', fn)

            expect(eventEmitter.emit('return')).toBe('success')
        })

        it('多个订阅', () => {
            const fn1 = vi.fn(() => 'first')
            const fn2 = vi.fn(() => 'second')
            const fn3 = vi.fn(() => 'third')

            eventEmitter.subscribe('returns', fn1)
            eventEmitter.subscribe('returns', fn2)
            eventEmitter.subscribe('returns', fn3)

            expect(eventEmitter.emit('returns')).toStrictEqual([
                'first',
                'second',
                'third'
            ])
        })
    })

    describe('移除订阅', () => {
        it('单个订阅', () => {
            const fn = vi.fn(() => {})

            eventEmitter.subscribe('unsubscribe', fn)
            eventEmitter.unsubscribe('unsubscribe', fn)

            eventEmitter.emit('unsubscribe')

            expect(fn).toHaveBeenCalledTimes(0)
        })

        it('多个订阅', () => {
            const fn1 = vi.fn(() => {})
            const fn2 = vi.fn(() => {})

            eventEmitter.subscribe('unsubscribes', fn1)
            eventEmitter.subscribe('unsubscribes', fn2)
            eventEmitter.unsubscribe('unsubscribes', fn1)

            eventEmitter.emit('unsubscribes')

            expect(fn1).toHaveBeenCalledTimes(0)
            expect(fn2).toHaveBeenCalledTimes(1)
        })
    })
})
