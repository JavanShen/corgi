import { AudioPlayer } from '@corgi/vue'
import { path, link } from '../source'

const VAudioPlayerPath = () => {
    return <AudioPlayer source={path} />
}

const VAudioPlayerLink = () => {
    return <AudioPlayer source={link} />
}

export { VAudioPlayerLink, VAudioPlayerPath }
