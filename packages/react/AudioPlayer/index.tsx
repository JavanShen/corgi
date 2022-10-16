import { usePlayAudio } from '@corgi/hooks'
import {
    Slider,
    IconButton,
    Card,
    CardMedia,
    Box,
    CardContent,
    Typography
} from '@mui/material'
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material'

import type { Source } from '@corgi/types'

interface Props {
    source: Source
}

const textOmission = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
} as const

const AudioPlayer = ({ source }: Props) => {
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
        isPlay
    } = usePlayAudio(source)

    return (
        <Card sx={{ display: 'flex', width: 'max-content' }}>
            <Box sx={{ display: 'flex', flexFlow: 'column nowrap', pr: 2 }}>
                <CardContent sx={{ flex: '1 0 auto', maxWidth: 170 }}>
                    <Typography component="div" variant="h5" sx={textOmission}>
                        {title}
                    </Typography>
                    <Typography
                        component="div"
                        variant="subtitle1"
                        color="text.secondary"
                        sx={textOmission}
                    >
                        {artist}
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                        minWidth: 170
                    }}
                >
                    <Slider
                        value={currentTime}
                        max={totalTime}
                        onChange={updateTime}
                        onChangeCommitted={jump}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pl: 2
                    }}
                >
                    <Typography
                        component="div"
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        {currentTimeText}
                    </Typography>
                    <Typography
                        component="div"
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        {totalTimeText}
                    </Typography>
                </Box>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                >
                    <IconButton
                        aria-label={isPlay ? 'play' : 'pause'}
                        onClick={() => {
                            return isPlay ? pause() : play()
                        }}
                    >
                        {isPlay ? <PauseRounded /> : <PlayArrowRounded />}
                    </IconButton>
                </Box>
            </Box>
            {imageSrc ? (
                <CardMedia
                    image={imageSrc}
                    component="div"
                    sx={{ width: 175 }}
                />
            ) : null}
        </Card>
    )
}

export default AudioPlayer
