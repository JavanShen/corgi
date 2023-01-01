import { path, link } from '@corgi/demo/AudioPlayer/source'
import AudioPlayer from '../../src/components/AudioPlayer'
import selector from '../data/selector'

const {
    titleSelector,
    artistSelector,
    playSelector,
    pauseSelector,
    currentTimeTextSelector,
    totalTimeTextSelector
} = selector

const AudioPath = () => <AudioPlayer source={path} />
const AudioLink = () => <AudioPlayer source={link} />

describe('<AudioPlayer>', () => {
    it('ID3标签解析成功', () => {
        cy.mount(<AudioPath />)
        cy.get(titleSelector).should(
            'have.text',
            'Super Mario Bros. / プレイヤーダウン'
        )
        cy.get(artistSelector).should('have.text', '近藤浩治')
    })

    it('初始化成功', () => {
        cy.mount(<AudioPath />)
        cy.get(playSelector).should('be.visible')
        cy.get(currentTimeTextSelector).should('have.text', '00:00')
        cy.get(totalTimeTextSelector).should('have.text', '00:05')
    })

    it('播放和暂停', () => {
        cy.mount(<AudioPath />)

        cy.get(playSelector).click()
        cy.get(pauseSelector).should('be.visible')

        cy.wait(2000)

        cy.get(currentTimeTextSelector).should('have.text', '00:03')
        cy.get(pauseSelector).click()
        cy.get(playSelector).should('be.visible')
    })

    it('ID3标签解析失败', () => {
        cy.mount(<AudioLink />)
        cy.get(titleSelector).should('have.text', '未知')
        cy.get(artistSelector).should('have.text', '未知')
    })
})
