import { useCallback } from 'react'
import { Card, Slider, Button, Image, theme } from 'antd'
import { usePlayAudio } from '@corgwn/hooks'
import type { AudioPlayerProps } from '@corgwn/types'
import type { CSSProperties, FC } from 'react'
import { PlayIcon, PauseIcon } from '@pembroke/icons'
import Volume from './components/Volume'
import {
    AudioContainer,
    AudioContent,
    AudioMedia,
    FlexBetween,
    SubTitle,
    SubTitle2,
    Title
} from './styled'

export type { AudioPlayerProps }
export type { AudioSource } from '@corgwn/hooks'

const AudioPlayer: FC<AudioPlayerProps & { style?: CSSProperties }> = ({
    source,
    loaded,
    cover,
    title,
    artist,
    showVolumeControl = false,
    style
}) => {
    const {
        currentTime,
        currentTimeText,
        totalTime,
        totalTimeText,
        imageSrc,
        title: id3Title,
        artist: id3Artist,
        play,
        pause,
        updateTime,
        jump,
        isPlay,
        isCanPlay,
        volume,
        updateVolume,
        mute,
        unmute
    } = usePlayAudio(source || '', loaded)

    const { token } = theme.useToken()

    return (
        <Card
            style={{
                display: 'inline-flex',
                width: 'max-content',
                ...style
            }}
        >
            <AudioContainer>
                <AudioContent>
                    <Title aria-label="title" title={title || id3Title}>
                        {title || id3Title}
                    </Title>
                    <SubTitle aria-label="artist" title={artist || id3Artist}>
                        {artist || id3Artist}
                    </SubTitle>
                    <Slider
                        value={currentTime}
                        max={totalTime}
                        tooltip={{ formatter: null }}
                        onChange={updateTime}
                        onAfterChange={jump}
                        disabled={!isCanPlay}
                        className="progress-bar"
                    />
                    <FlexBetween>
                        <SubTitle2 aria-label="currentTimeText">
                            {currentTimeText}
                        </SubTitle2>
                        <SubTitle2 aria-label="totalTimeText">
                            {totalTimeText}
                        </SubTitle2>
                    </FlexBetween>
                    <FlexBetween>
                        <Button
                            size="large"
                            type="text"
                            shape="circle"
                            style={{ border: 'none' }}
                            disabled={!isCanPlay}
                            aria-label={isPlay ? 'pause' : 'play'}
                            icon={
                                isPlay ? (
                                    <PauseIcon
                                        style={{ color: token.colorText }}
                                    />
                                ) : (
                                    <PlayIcon
                                        style={{
                                            color: token.colorText
                                        }}
                                    />
                                )
                            }
                            onClick={() => {
                                return isPlay ? pause() : play()
                            }}
                        />
                        {showVolumeControl ? (
                            <Volume
                                isMute={!volume}
                                volume={volume || 0}
                                onClick={useCallback(volume ? mute : unmute, [
                                    volume
                                ])}
                                updateVolume={useCallback(updateVolume, [
                                    volume
                                ])}
                            />
                        ) : null}
                    </FlexBetween>
                </AudioContent>
                {(imageSrc || cover) && cover !== false ? (
                    <AudioMedia aria-label="cover">
                        <Image
                            preview={false}
                            src={cover || imageSrc}
                            height={175}
                            width={175}
                        />
                    </AudioMedia>
                ) : null}
            </AudioContainer>
        </Card>
    )
}

export default AudioPlayer
