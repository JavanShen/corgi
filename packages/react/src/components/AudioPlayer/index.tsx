import { useCallback } from 'react'
import { Card, Slider, Button, Image } from 'antd'
import { usePlayAudio } from '@corgwn/hooks'
import type { AudioPlayerProps } from '@corgwn/types'
import type { CSSProperties } from 'react'
import Volume from './components/Volume'
import { PlayIcon, PauseIcon } from '../../icons'
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

const AudioPlayer = ({
    source,
    loaded,
    cover,
    title,
    artist,
    showVolumeControl = false,
    style
}: AudioPlayerProps & { style?: CSSProperties }) => {
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
                            icon={isPlay ? <PauseIcon /> : <PlayIcon />}
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
