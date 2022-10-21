import { zeroFill } from '../text'

test('当小于10时在前面补零', () => {
    expect(zeroFill(9)).toBe('09')
    expect(zeroFill(0)).toBe('00')
    expect(zeroFill(12)).toBe('12')
})
