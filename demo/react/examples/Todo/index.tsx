import assemble from '../assemble'

const TodoDemos = assemble(
    import.meta.glob<() => JSX.Element>('./*.tsx', {
        import: 'default',
        eager: true
    })
)

export default TodoDemos
