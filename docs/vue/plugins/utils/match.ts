import { fileReg } from './reg.js'

const matchFileName = (path: string) => path.match(fileReg)?.[1] || ''

const matchProp = (element: string, propName: string) =>
    element.match(new RegExp(`${propName}=["']([^'"]+)["']`))?.[1] || ''
export { matchFileName, matchProp }
