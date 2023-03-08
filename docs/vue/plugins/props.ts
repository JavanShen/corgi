import type MarkdownIt from 'markdown-it'
import { demoReg } from './utils/reg.js'
import { matchFileName } from './utils/match.js'

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["md"] }] */

const propsPlugin: MarkdownIt.PluginSimple = md => {
    const htmlInlineRule = md.renderer.rules.html_inline

    md.renderer.rules.html_inline = (...arg) => {
        const [tokens, idx, , env] = arg

        const { content } = tokens[idx]

        if (demoReg.test(content)) {
            env.demoInfo = {}

            const matchProp = (propName: string) => {
                return content.match(
                    new RegExp(`${propName}=["']([^'"]+)["']`)
                )?.[1]
            }

            env.demoInfo.src = matchProp('src') || ''
            env.demoInfo.desc = matchProp('desc') || ''
            env.demoInfo.title = matchProp('title') || ''
            env.demoInfo.name = matchFileName(env.demoInfo.src)
        }

        return htmlInlineRule?.(...arg) || ''
    }
}

export default propsPlugin
