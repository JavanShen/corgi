const catchErr = <T, U = Error>(promise: Promise<T>, errorExt?: object) => {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            return [errorExt ? { ...err, ...errorExt } : err, undefined]
        })
}

export default catchErr
