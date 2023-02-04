import { generateSelectors } from '@corgii/utils/cypress/selector'

const audioPlayerCollect = [
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

const audioPlayerSelector = generateSelectors(audioPlayerCollect)

export { audioPlayerSelector }
