const zeroFill = (num: number) => {
    if (num < 10 && num >= 0) return `0${num}`
    return num.toString()
}

export { zeroFill }
