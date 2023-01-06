import Icon from '@ant-design/icons'
import type {
    CustomIconComponentProps,
    IconComponentProps
} from '@ant-design/icons/lib/components/Icon'
import { ReactComponent as Pause } from './svg/pause.svg'
import { ReactComponent as Play } from './svg/play.svg'
import { ReactComponent as Volume } from './svg/volume.svg'
import { ReactComponent as Mute } from './svg/mute.svg'

const PauseSvg = () => <Pause />
const PlaySvg = () => <Play />
const VolumeSvg = () => <Volume />
const MuteSvg = () => <Mute />

const generateIcon = (component: IconComponentProps['component']) => {
    const CustomIcon = (props: Partial<CustomIconComponentProps>) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <Icon component={component} {...props} />
    )
    return CustomIcon
}

const PlayIcon = generateIcon(PlaySvg)
const PauseIcon = generateIcon(PauseSvg)
const VolumeIcon = generateIcon(VolumeSvg)
const MuteIcon = generateIcon(MuteSvg)

export { PlayIcon, PauseIcon, VolumeIcon, MuteIcon }
