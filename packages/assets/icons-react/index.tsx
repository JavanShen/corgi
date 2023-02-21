import Icon from '@ant-design/icons/es/components/Icon'
import type {
    CustomIconComponentProps,
    IconComponentProps
} from '@ant-design/icons/lib/components/Icon'
import type { FC, SVGProps } from 'react'

type SvgComponent = FC<SVGProps<SVGSVGElement> & { title?: string }>

const modules = import.meta.glob<SvgComponent>('../svg/*.svg', {
    import: 'ReactComponent',
    eager: true
})

const svgs = {} as Record<string, SvgComponent>

Object.keys(modules).forEach(key => {
    svgs[key.match(/\/([a-z_A-Z-]+)\.svg$/)?.[1] || ''] = modules[key]
})

const generateIcon = (component: IconComponentProps['component']) => {
    const CustomIcon = (props: Partial<CustomIconComponentProps>) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <Icon component={component} {...props} />
    )
    return CustomIcon
}

const PlayIcon = generateIcon(svgs.play)
const PauseIcon = generateIcon(svgs.pause)
const VolumeIcon = generateIcon(svgs.volume)
const MuteIcon = generateIcon(svgs.mute)
const MinusIcon = generateIcon(svgs.minus)
const AddIcon = generateIcon(svgs.add)
const DeleteIcon = generateIcon(svgs.delete)
const ConfirmIcon = generateIcon(svgs.confirm)

export {
    PlayIcon,
    PauseIcon,
    VolumeIcon,
    MuteIcon,
    MinusIcon,
    AddIcon,
    DeleteIcon,
    ConfirmIcon
}
