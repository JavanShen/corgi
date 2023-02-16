import { DefineComponent } from 'vue'
import assemble from '../assemble'

const AudioPlayerDemos = assemble(
    import.meta.glob<DefineComponent>('./*.vue', {
        import: 'default',
        eager: true
    })
)

export default AudioPlayerDemos
