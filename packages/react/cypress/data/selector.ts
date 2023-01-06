import { prefix } from '../utils/selector'

const collect = [
    'title',
    'artist',
    'play',
    'pause',
    'currentTimeText',
    'totalTimeText',
    'cover',
    'volumeButton',
    'muteIcon',
    'volumeIcon'
] as const

type Collect = typeof collect[number]

type SelectorCollect = {
    [key in Collect as `${key}Selector`]: `[aria-label=${key}]`
}

const generateSelectors = () => {
    const obj: Record<string, string> = {}

    new Set(collect).forEach(val => {
        obj[prefix('Selector', val)] = `[${prefix(val)}]`
    })

    return obj as SelectorCollect
}

const selector: SelectorCollect = generateSelectors()

export default selector
