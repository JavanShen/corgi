const generateMP3File = (buf: Buffer) =>
    new File([buf], 'demo.mp3', { type: 'audio/mpeg' })

const readMP3File = () =>
    new Promise<File>(res => {
        cy.readFile('../utils/assets/demo.mp3', null).then((mp3: Buffer) => {
            res(generateMP3File(mp3))
        })
    })

export { readMP3File }
