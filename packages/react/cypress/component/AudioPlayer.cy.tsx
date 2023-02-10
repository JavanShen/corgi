import { readMP3File } from '@corgwn/utils/cypress/file'
import { move } from '@corgwn/utils/cypress/action'
import AudioPlayer from '../../src/components/AudioPlayer'
import { audioPlayerSelector } from '../data/selector'

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
} = audioPlayerSelector

const AudioLink = () => <AudioPlayer source={link} />

describe('<AudioPlayer>', () => {
    describe('初始化', () => {
        it('显示时长', () => {
            readMP3File().then(file => {
                cy.mount(<AudioPlayer source={file} />)

                cy.get(playSelector).should('be.visible')
                cy.get(currentTimeTextSelector).should('have.text', '00:00')
                cy.get(totalTimeTextSelector).should('have.text', '00:05')
            })
        })

        it('默认标题和创作者', () => {
            cy.mount(<AudioLink />)

            cy.get(titleSelector).should('have.text', '未知')
            cy.get(artistSelector).should('have.text', '未知')
        })

        it('显示自定义的信息', () => {
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
            cy.get(coverSelector)
                .find('img')
                .should('have.attr', 'src', picLink)
        })

        it('隐藏封面', () => {
            readMP3File().then(file => {
                cy.mount(<AudioPlayer source={file} cover={false} />)

                cy.get(coverSelector).should('not.exist')
            })
        })

        it('显示ID3解析内容', () => {
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

        it('加载完成后触发回调', () => {
            readMP3File().then(file => {
                const onLoaded = cy.spy().as('onLoaded')

                cy.mount(<AudioPlayer source={file} loaded={onLoaded} />)
                cy.get('@onLoaded').should('have.been.called')
            })
        })
    })

    describe('操作', () => {
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

        describe('音量控件', () => {
            const hoverVolumeBtnTest = () => {
                return cy
                    .get('@volumeBtn')
                    .trigger('mouseover')
                    .get('.volume-control')
                    .should('be.visible')
                    .find('.ant-slider-handle')
                    .as('sliderBtn')
            }

            it('切换静音', () => {
                readMP3File().then(file => {
                    cy.mount(<AudioPlayer source={file} showVolumeControl />)

                    cy.get(volumeButtonSelector).as('volumeBtn')

                    hoverVolumeBtnTest()

                    cy.get(playSelector).click().wait(1000)

                    cy.get(volumeIconSelector)
                        .should('be.visible')
                        .get('@volumeBtn')
                        .click()
                        .find(muteIconSelector)
                        .should('be.visible')
                        .get('@sliderBtn')
                        .should('have.attr', 'aria-valuenow', '0')
                        .wait(1000)

                    cy.get('@volumeBtn')
                        .click()
                        .find(volumeIconSelector)
                        .should('be.visible')
                        .get('@sliderBtn')
                        .should('have.attr', 'aria-valuenow', '100')
                        .wait(1000)

                    cy.get(pauseSelector).click()
                })
            })

            it('调整音量', () => {
                readMP3File().then(file => {
                    cy.mount(<AudioPlayer source={file} showVolumeControl />)

                    cy.get(volumeButtonSelector).as('volumeBtn')

                    hoverVolumeBtnTest()

                    move('@sliderBtn', 0, 50)
                        .get(playSelector)
                        .click()
                        .wait(1000)
                    move('@sliderBtn', 0, -50)
                        .wait(1000)
                        .get(pauseSelector)
                        .click()
                })
            })
        })

        describe('进度条', () => {
            const dragProcessBarTest = () => {
                cy.get('.progress-bar')
                    .find('.ant-slider-handle')
                    .as('sliderBtn')

                return move('@sliderBtn', 120, 0)
                    .get(currentTimeTextSelector)
                    .should('have.text', '00:03')
            }

            it('暂停时拖动进度条', () => {
                readMP3File().then(file => {
                    cy.mount(<AudioPlayer source={file} />).wait(1500)

                    dragProcessBarTest()
                })
            })

            it('播放时拖动进度条', () => {
                readMP3File().then(file => {
                    cy.mount(<AudioPlayer source={file} />).wait(1500)

                    cy.get(playSelector).click()

                    dragProcessBarTest()

                    cy.get(pauseSelector).click()
                })
            })
        })
    })
})
