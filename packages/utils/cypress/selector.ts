const prefix = <V extends string, P extends string>(
    val: V,
    pre: P = 'aria-label=' as P
): `${P}${V}` => {
    return `${pre}${val}`
}

const generateSelectors = <T extends readonly string[]>(collect: T) => {
    const obj: Record<string, string> = {}

    new Set(collect).forEach(val => {
        obj[prefix('Selector', val)] = `[${prefix(val)}]`
    })

    return obj as {
        [K in T[number] as `${K}Selector`]: `[aria-label=${K}]`
    }
}

export { prefix, generateSelectors }
