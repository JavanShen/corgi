import { it, expect } from 'vitest'
import { secondsToMinutes } from '../time'

it('秒转分钟', () => {
    expect(secondsToMinutes(25)).toBe('00:25')
    expect(secondsToMinutes(90)).toBe('01:30')
})
