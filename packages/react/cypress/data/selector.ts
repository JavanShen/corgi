import { prefix } from '../utils/selector'

const collect = [
    'title',
    'artist',
    'play',
    'pause',
    'currentTimeText',
    'totalTimeText'
]

const selector: { [key: string]: string } = {}

new Set(collect).forEach(val => {
    selector[prefix('Selector', val)] = `[${prefix(val)}]`
})

export default selector
