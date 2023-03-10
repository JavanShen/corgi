const demoSelfClosingReg = /^<demo[^>]+\/>$/

const demoOpenCloseReg = /^[\r\n\s]*<Demo\s*[^>]*>[^]*<\/Demo>[\r\n\s]*$/

const fileReg = /([^/\\]+)\.[a-zA-Z]+$/

export { demoSelfClosingReg, fileReg, demoOpenCloseReg }
