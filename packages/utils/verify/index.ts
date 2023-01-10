const getType = (val: unknown) => {
    return Object.prototype.toString
        .call(val)
        .match(/^\[object ([A-Z][a-z]+)\]$/)?.[1]
}

export { getType }
