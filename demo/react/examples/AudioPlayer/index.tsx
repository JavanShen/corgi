import assemble from '../assemble'

const AudioPlayerDemos = assemble(
    import.meta.glob<() => JSX.Element>('./*.tsx', {
        import: 'default',
        eager: true
    })
)

export default AudioPlayerDemos
