import type MarkdownIt from 'markdown-it'
import { demoReg } from './utils/reg.js'
import { matchDemoProps } from './utils/match.js'

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["md"] }] */

const propsPlugin: MarkdownIt.PluginSimple = md => {
    const htmlInlineRule = md.renderer.rules.html_inline

    md.renderer.rules.html_inline = (...arg) => {
        const [tokens, idx, , env] = arg

        const { content } = tokens[idx]

        if (demoReg.test(content)) {
            env.demoInfo = { ...matchDemoProps(content) }
        }

        return htmlInlineRule?.(...arg) || ''
    }
}

export default propsPlugin
