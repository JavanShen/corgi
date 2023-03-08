import { fileReg } from './reg.js'

const matchFileName = (path: string) => {
    return path.match(fileReg)?.[1] || ''
}

export { matchFileName }
