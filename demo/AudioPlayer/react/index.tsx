import { AudioPlayer } from '@corgi/react'
import { path, link } from '../source'

const RAudioPlayerPath = () => {
    return <AudioPlayer source={path} />
}

const RAudioPlayerLink = () => {
    return <AudioPlayer source={link} />
}

export { RAudioPlayerLink, RAudioPlayerPath }
