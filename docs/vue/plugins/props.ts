import type MarkdownIt from 'markdown-it'
import { demoOpenCloseReg } from './utils/reg.js'
import { matchDemoProps, matchDemoChildName } from './utils/match.js'

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["md"] }] */

const propsPlugin: MarkdownIt.PluginSimple = md => {
    const htmlInlineRule = md.renderer.rules.html_inline

    md.renderer.rules.html_inline = (...arg) => {
        const [tokens, idx, , env] = arg

        const { content } = tokens[idx]

        if (demoOpenCloseReg.test(content) && env.demoInfo) {
            env.demoInfo.push({
                ...matchDemoProps(content),
                name: matchDemoChildName(content)
            })
        }

        return htmlInlineRule?.(...arg) || ''
    }
}

export default propsPlugin
