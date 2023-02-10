import { AudioPlayer } from '@corgwn/react'

const AudioPlayerDemo = () => (
    <AudioPlayer
        source="https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm"
        cover="https://github.com/JavanShen/corgi/blob/main/docs/react/public/corgi.png?raw=true"
        title="corgwn"
        artist="apine"
        showVolumeControl
    />
)

export default AudioPlayerDemo
