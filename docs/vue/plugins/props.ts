import type MarkdownIt from 'markdown-it'
import { demoReg } from './utils/reg.js'
import { matchFileName, matchProp } from './utils/match.js'

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["md"] }] */

const propsPlugin: MarkdownIt.PluginSimple = md => {
    const htmlInlineRule = md.renderer.rules.html_inline

    md.renderer.rules.html_inline = (...arg) => {
        const [tokens, idx, , env] = arg

        const { content } = tokens[idx]

        if (demoReg.test(content)) {
            env.demoInfo = {}

            const matchPropWithContent = (propName: string) =>
                matchProp(content, propName)

            env.demoInfo.src = matchPropWithContent('src') || ''
            env.demoInfo.desc = matchPropWithContent('desc') || ''
            env.demoInfo.title = matchPropWithContent('title') || ''
            env.demoInfo.name = matchFileName(env.demoInfo.src)
        }

        return htmlInlineRule?.(...arg) || ''
    }
}

export default propsPlugin
