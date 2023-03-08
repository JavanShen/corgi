import fs from 'fs'
import fsAsync from 'fs/promises'
import path from 'path'
import { Transform } from 'stream'
import markdownIt from 'markdown-it'
import componentPlugin from '../plugins/component.js'
import propsPlugin from '../plugins/props.js'

/* eslint-disable no-console */

/* eslint no-underscore-dangle: ["error", { "allow": ["__dirname"] }] */
const __dirname = path.resolve()
const vueTemplate = (template: string, script = '') => {
    return `<template>
${template}
</template>
<script setup lang="ts">
${script}
</script>`
}

const md = markdownIt({ html: true }).use(componentPlugin).use(propsPlugin)

const getFiles = async (dir: string, filesList = [] as string[]) => {
    try {
        const files = await fsAsync.readdir(path.resolve(__dirname, dir))

        for await (const file of files) {
            const filePath = path.join(dir, file)
            if ((await fsAsync.stat(filePath)).isDirectory()) {
                filesList.push(...(await getFiles(filePath)))
            } else {
                filesList.push(filePath)
            }
        }
    } catch (e) {
        console.error(e)
    }

    return filesList
}

const docsDirName = 'docs'

/**
 *
 * @param dirPath 包含文件的路径，xxx/xx/x.js
 */
const mkdir = async (dirPath: string) => {
    const dirList = dirPath
        .split('\\')
        .filter(item => item !== '')
        .slice(0, -1)

    let joinPath = ''
    for await (const dir of dirList) {
        try {
            await fsAsync.mkdir(path.resolve(__dirname, joinPath + dir))
        } catch (e) {
            // ignore
        }
        joinPath += `${dir}/`
    }
}

const docsFileList = await getFiles(docsDirName)

for await (const filePath of docsFileList) {
    const input = filePath
    const output = `src\\view${
        filePath.match(new RegExp(`${docsDirName}(.+).md`))?.[1]
    }.vue`
    await mkdir(output)

    await new Promise(res => {
        const readableStream = fs.createReadStream(
            path.resolve(__dirname, input)
        )
        const writableStream = fs.createWriteStream(
            path.resolve(__dirname, output)
        )
        const mdTransform = new Transform({
            transform(chunk, _, callback) {
                const env = {}
                const renderRes = md.render(chunk.toString(), env)

                callback(null, vueTemplate(renderRes))
            }
        })
        readableStream
            .pipe(mdTransform)
            .pipe(writableStream)
            .on('finish', () => {
                res('finish')
            })
    })
}
