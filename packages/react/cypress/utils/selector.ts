const prefix = <V extends string, P extends string>(
    val: V,
    pre: P = 'aria-label=' as P
): `${P}${V}` => {
    return `${pre}${val}`
}

export { prefix }
