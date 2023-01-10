import { it, expect } from 'vitest'
import { getType } from '../verify'

it('类型判断', () => {
    const str = 'a'
    const empty = null
    const date = new Date()

    expect(getType(str)).toBe('String')
    expect(getType(empty)).toBe('Null')
    expect(getType(date)).toBe('Date')
})
