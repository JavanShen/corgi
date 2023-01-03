import AudioPlayer from '../../src/components/AudioPlayer'
import selector from '../data/selector'

const link =
    'https://m10.music.126.net/20230103150836/873cf52ab7ce26a45779eacda1fefc30/ymusic/8fbd/c108/0af7/1336bcac832347940e9ca752e7927492.mp3'

const generateMP3File = (buf: Buffer) =>
    new File([buf], 'demo.mp3', { type: 'audio/mpeg' })

const readMP3File = () =>
    new Promise<File>(res => {
        cy.readFile('cypress/assets/demo.mp3', null).then((mp3: Buffer) => {
            res(generateMP3File(mp3))
        })
    })

const {
    titleSelector,
    artistSelector,
    playSelector,
    pauseSelector,
    currentTimeTextSelector,
    totalTimeTextSelector
} = selector

const AudioLink = () => <AudioPlayer source={link} />

describe('<AudioPlayer>', () => {
    it('ID3标签解析成功', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)
            cy.get(titleSelector).should(
                'have.text',
                'Super Mario Bros. / プレイヤーダウン'
            )
            cy.get(artistSelector).should('have.text', '近藤浩治')
        })
    })

    it('初始化成功', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)

            cy.get(playSelector).should('be.visible')
            cy.get(currentTimeTextSelector).should('have.text', '00:00')
            cy.get(totalTimeTextSelector).should('have.text', '00:05')
        })
    })

    it('播放和暂停', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)

            cy.get(playSelector).click()
            cy.get(pauseSelector).should('be.visible')

            cy.wait(2000)

            cy.get(currentTimeTextSelector).should('have.text', '00:03')
            cy.get(pauseSelector).click()
            cy.get(playSelector).should('be.visible')
        })
    })

    it('ID3标签解析失败', () => {
        cy.mount(<AudioLink />)
        cy.get(titleSelector).should('have.text', '未知')
        cy.get(artistSelector).should('have.text', '未知')
    })
})
