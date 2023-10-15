import { fileReg } from './reg.js'

const matchFileName = (path: string) => path.match(fileReg)?.[1] || ''

const matchProp = (element: string, propName: string) =>
    element.match(new RegExp(`${propName}=["']([^'"]+)["']`))?.[1] || ''

const matchProps = <T extends readonly string[]>(
    element: string,
    propsName: T
) =>
    propsName.reduce(
        (pre, cur) => ({ ...pre, [cur]: matchProp(element, cur) }),
        {}
    ) as { [K in T[number]]: string } & { name: string }

const matchDemoProps = (demo: string) => ({
    ...matchProps(demo, ['src', 'desc', 'title'] as const),
    name: matchFileName(matchProp(demo, 'src'))
})

const matchDemoChildName = (demo: string) =>
    demo.match(/<template>\s*<([a-zA-Z-]+) \/>\s*<\/template>/)?.[1] || ''

export {
    matchFileName,
    matchProp,
    matchProps,
    matchDemoProps,
    matchDemoChildName
}
