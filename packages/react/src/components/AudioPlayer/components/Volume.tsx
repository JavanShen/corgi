import { memo } from 'react'
import { Slider, Popover, Button } from 'antd'
import { VolumeIcon, MuteIcon } from '../../../icons'

interface Props {
    volume: number
    isMute: boolean
    updateVolume: (val: number) => void
    onClick: () => void
}

const Volume = ({ volume, isMute, updateVolume, onClick }: Props) => {
    return (
        <Popover
            content={
                <Slider
                    value={volume}
                    tooltip={{ formatter: null }}
                    vertical
                    onChange={updateVolume}
                    style={{ height: 80 }}
                />
            }
            placement="top"
            overlayClassName="volume-control"
            overlayInnerStyle={{ padding: '10px 2px 6px 2px' }}
            overlayStyle={{ padding: 2 }}
        >
            <Button
                shape="circle"
                size="large"
                type="link"
                style={{ border: 'none' }}
                icon={
                    isMute ? (
                        <MuteIcon aria-label="muteIcon" />
                    ) : (
                        <VolumeIcon aria-label="volumeIcon" />
                    )
                }
                onClick={onClick}
                aria-label="volumeButton"
            />
        </Popover>
    )
}

export default memo(Volume)
