/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-underscore-dangle */
import MarkdownIt from 'markdown-it'
import { transformSync } from '@babel/core'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// componentPreview check
export const isCheckPreviewCom1 = /^<preview (.*)><\/preview>$/
export const isCheckPreviewCom2 = /^<preview (.*) \/>$/
export const isCheckContainerPreview = /^demo-preview=(.+)$/

const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptSetupCommonRE =
    /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/

/**
 * 统一处理组件名称->驼峰命名
 * @param componentName
 */
export const handleComponentName = (componentName: string) => {
    let newName = componentName
    newName = newName.replaceAll(/[_|-]+(\w)/g, (_, $1) => {
        return $1.toUpperCase()
    })
    return newName
}

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const injectComponentImportScript = (
    env: any,
    path: string,
    componentName: string
) => {
    // https://github.com/vuejs/vitepress/issues/1258  __Path、__Relativepath、__data.Hoistedtags 被删除解决方案
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/src/types.ts
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/tests/__snapshots__/sfc-plugin.spec.ts.snap
    const scriptsCode = env.sfcBlocks.scripts as any[]

    // 判断MD文件内部是否本身就存在 <script setup> 脚本

    const scriptsSetupIndex = scriptsCode.findIndex((script: any) => {
        if (
            scriptSetupRE.test(script.tagOpen) ||
            scriptLangTsRE.test(script.tagOpen)
        )
            return true
        return false
    })

    // 统一处理组件名称为驼峰命名
    const _componentName = handleComponentName(componentName)

    // MD文件中没有 <script setup> 或 <script setup lang='ts'> 脚本文件
    if (scriptsSetupIndex === -1) {
        const scriptBlockObj = {
            type: 'script',
            tagClose: '</script>',
            tagOpen: "<script setup lang='ts'>",
            content: `<script setup lang='ts'>
        import ${_componentName} from '${path}'
        </script>`,
            contentStripped: `import ${_componentName} from '${path}'`
        }
        scriptsCode.push(scriptBlockObj)
    } else {
        // MD文件注入了 <script setup> 或 <script setup lang='ts'> 脚本
        const oldScriptsSetup = scriptsCode[0]
        // MD文件中存在已经引入了组件
        if (
            oldScriptsSetup.content.includes(path) &&
            oldScriptsSetup.content.includes(_componentName)
        ) {
            scriptsCode[0].content = oldScriptsSetup.content
        } else {
            // MD文件中不存在组件 添加组件 import ${_componentName} from '${path}'\n

            // 如果MD文件中存在 <script setup lang="ts">、<script lang="ts" setup>  或 <script setup> 代码块, 那么统一转换为 <script setup lang="ts">
            const scriptCodeBlock = '<script lang="ts" setup>\n'
            scriptsCode[0].content = scriptsCode[0].content.replace(
                scriptSetupCommonRE,
                scriptCodeBlock
            )

            // 将组件引入的代码放进去
            scriptsCode[0].content = scriptsCode[0].content.replace(
                scriptCodeBlock,
                `<script setup>\n
      import ${_componentName} from '${path}'\n`
            )
        }
    }
}

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (
    mdInstance: MarkdownIt,
    sourceCode: string,
    suffix: string
) => mdInstance.options.highlight!(sourceCode, suffix, '')

export const tsToJs = (sourceCode: string) => {
    if (!sourceCode) return ''

    const { code } =
        transformSync(sourceCode, {
            configFile: false,
            plugins: [
                [
                    require.resolve('@babel/plugin-transform-typescript'),
                    {
                        isTSX: false
                    }
                ]
            ]
        }) || {}

    return code || ''
}

/**
 * 获取文件名作为组件名称
 * @param path
 * @returns
 */
export const composeComponentName = (path: string) => {
    return path.match(/\/(\w+)(\.\w+)$/)?.[1] || ''
}

/**
 * 检查组件相对路径
 * @param path
 * @returns
 */
export const isCheckingRelativePath = (path: string) => {
    const relativePath = path
    if (
        relativePath.startsWith('./') ||
        relativePath.startsWith('../') ||
        relativePath.startsWith('/')
    )
        return relativePath
    // 如果是 '@' 开头则认为是依赖
    if (relativePath.startsWith('@')) return `../node_modules/${relativePath}`
    return `./${relativePath}`
}
