import { Card, Slider, Button, Image } from 'antd'
import { usePlayAudio } from '@corgi/hooks'
import styled from '@emotion/styled'

import type { Source } from '@corgi/types'
import { PlayIcon, PauseIcon } from '../../icons'

interface Props {
    source: Source
    loaded?: () => void
}

const textOmission = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
} as const

const AudioContent = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    minWidth: 170,
    maxWidth: 200,
    justifyContent: 'space-between'
})

const AudioContainer = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap'
})

const AudioMedia = styled.div({
    marginLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 175,
    width: 175
})

const Title = styled.div({
    fontSize: 22,
    color: 'black',
    ...textOmission
})

const SubTitle = styled.div({
    fontSize: 16,
    color: '#838383',
    ...textOmission
})

const SubTitle2 = styled.div({
    fontSize: 14,
    color: '#838383',
    ...textOmission
})

const FlexBetween = styled.div({
    display: 'flex',
    justifyContent: 'space-between'
})

const AudioPlayer = ({ source, loaded }: Props) => {
    const {
        currentTime,
        currentTimeText,
        totalTime,
        totalTimeText,
        imageSrc,
        title,
        artist,
        play,
        pause,
        updateTime,
        jump,
        isPlay,
        isCanPlay
    } = usePlayAudio(source, loaded)

    return (
        <Card
            style={{
                display: 'inline-flex',
                width: 'max-content'
            }}
        >
            <AudioContainer>
                <AudioContent>
                    <Title aria-label="title">{title}</Title>
                    <SubTitle aria-label="artist">{artist}</SubTitle>
                    <Slider
                        value={currentTime}
                        max={totalTime}
                        tooltip={{ formatter: null }}
                        onChange={updateTime}
                        onAfterChange={jump}
                        disabled={!isCanPlay}
                    />
                    <FlexBetween>
                        <SubTitle2 aria-label="currentTimeText">
                            {currentTimeText}
                        </SubTitle2>
                        <SubTitle2 aria-label="totalTimeText">
                            {totalTimeText}
                        </SubTitle2>
                    </FlexBetween>
                    <Button
                        size="large"
                        type="text"
                        shape="circle"
                        disabled={!isCanPlay}
                        aria-label={isPlay ? 'pause' : 'play'}
                        icon={isPlay ? <PauseIcon /> : <PlayIcon />}
                        onClick={() => {
                            return isPlay ? pause() : play()
                        }}
                    />
                </AudioContent>
                {imageSrc ? (
                    <AudioMedia>
                        <Image preview={false} src={imageSrc} width={175} />
                    </AudioMedia>
                ) : null}
            </AudioContainer>
        </Card>
    )
}

export default AudioPlayer
