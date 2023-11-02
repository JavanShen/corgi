import { memo } from 'react'
import { Slider, Popover, Button, theme } from 'antd'
import { VolumeIcon, MuteIcon } from '@pembroke/icons'

interface Props {
    volume: number
    isMute: boolean
    updateVolume: (val: number) => void
    onClick: () => void
}

const Volume = ({ volume, isMute, updateVolume, onClick }: Props) => {
    const { token } = theme.useToken()

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
                        <MuteIcon
                            style={{ color: token.colorText }}
                            aria-label="muteIcon"
                        />
                    ) : (
                        <VolumeIcon
                            style={{
                                color: token.colorText
                            }}
                            aria-label="volumeIcon"
                        />
                    )
                }
                onClick={onClick}
                aria-label="volumeButton"
            />
        </Popover>
    )
}

export default memo(Volume)
