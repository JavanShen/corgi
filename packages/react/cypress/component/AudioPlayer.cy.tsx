import AudioPlayer from '../../src/components/AudioPlayer'
import selector from '../data/selector'
import { readMP3File } from '../utils/file'
import { move } from '../utils/action'

const link =
    'https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm'

const picLink =
    'https://github.com/JavanShen/corgi/blob/main/docs/react/public/corgi.png?raw=true'

const {
    titleSelector,
    artistSelector,
    playSelector,
    pauseSelector,
    currentTimeTextSelector,
    totalTimeTextSelector,
    coverSelector,
    volumeButtonSelector,
    muteIconSelector,
    volumeIconSelector
} = selector

const AudioLink = () => <AudioPlayer source={link} />

describe('<AudioPlayer>', () => {
    it('初始化成功', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)

            cy.get(playSelector).should('be.visible')
            cy.get(currentTimeTextSelector).should('have.text', '00:00')
            cy.get(totalTimeTextSelector).should('have.text', '00:05')
        })
    })

    it('使用自定义的信息', () => {
        cy.mount(
            <AudioPlayer
                source={link}
                title="标题"
                artist="创作者"
                cover={picLink}
            />
        )

        cy.get(titleSelector).should('have.text', '标题')
        cy.get(artistSelector).should('have.text', '创作者')
        cy.get(coverSelector).find('img').should('have.attr', 'src', picLink)
    })

    it('使用音量控件', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} showVolumeControl />)

            cy.get(volumeButtonSelector).as('volumeBtn')

            cy.get(volumeIconSelector)
                .should('be.visible')
                .get('@volumeBtn')
                .click()
                .find(muteIconSelector)
                .should('be.visible')
                .get('@volumeBtn')
                .click()
                .find(volumeIconSelector)
                .should('be.visible')

            cy.get('@volumeBtn')
                .trigger('mouseover')
                .get('.volume-control')
                .should('be.visible')
                .find('.ant-slider-handle')
                .as('slider')

            move('@slider', 0, 20).then(() => {
                cy.get(playSelector).click()
                cy.wait(3000)
            })
        })
    })

    it('隐藏封面', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} cover={false} />)

            cy.get(coverSelector).should('not.exist')
        })
    })

    it('加载完成后触发回调', () => {
        readMP3File().then(file => {
            const onLoaded = cy.spy().as('onLoaded')

            cy.mount(<AudioPlayer source={file} loaded={onLoaded} />)
            cy.get('@onLoaded').should('have.been.called')
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

    it.skip('拖动进度条', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)
        })
    })

    it('ID3标签解析成功', () => {
        readMP3File().then(file => {
            cy.mount(<AudioPlayer source={file} />)

            cy.get(titleSelector).should(
                'have.text',
                'Super Mario Bros. / プレイヤーダウン'
            )
            cy.get(artistSelector).should('have.text', '近藤浩治')
            cy.get(coverSelector).find('img').should('have.attr', 'src')
        })
    })

    it('ID3标签解析失败', () => {
        cy.mount(<AudioLink />)

        cy.get(titleSelector).should('have.text', '未知')
        cy.get(artistSelector).should('have.text', '未知')
    })
})
