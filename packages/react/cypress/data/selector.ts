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

const todoCollect = [
    'addBtn',
    'addConfirmBtn',
    'addInput',
    'removeBtn',
    'todo',
    'todoLabel',
    'strikethrough'
] as const

const audioPlayerSelector = generateSelectors(audioPlayerCollect)
const todoSelector = generateSelectors(todoCollect)

export { audioPlayerSelector, todoSelector }
