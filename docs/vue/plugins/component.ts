import type MarkdownIt from 'markdown-it'
import { demoReg } from './utils/reg.js'
import { matchDemoProps } from './utils/match.js'

const componentPlugin: MarkdownIt.PluginSimple = md => {
    md.block.ruler.at('html_block', (state, start) => {
        const pos = state.bMarks[start] - state.tShift[start]
        const max = state.eMarks[start]

        if (!state.md.options.html) return false
        if (state.src.charCodeAt(pos) !== 0x3c) return false

        const content = state.src.slice(pos, max)

        if (demoReg.test(content)) {
            state.line = start + 1
            const token = state.push('html_inline', '', 0)
            const { title, name, desc } = matchDemoProps(content)
            token.content = `<Demo title="${title}" desc="${desc}" :content="${`${name}Content`}">
                <template>
                    <${name} />
                </template>
            </Demo>`
            token.map = [start, state.line]
            return true
        }

        state.line = start + 1
        const token = state.push('html_block', '', 0)
        token.map = [start, start + 1]
        token.content = state.getLines(start, start + 1, state.blkIndent, true)

        return true
    })
}

export default componentPlugin
