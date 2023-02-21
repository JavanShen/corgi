import type { Component, FunctionalComponent, SVGAttributes } from 'vue'
import Icon from '@ant-design/icons-vue/es/components/Icon'
import type { IconComponentProps } from '@ant-design/icons-vue/es/components/Icon'

type SvgComponent = FunctionalComponent<SVGAttributes, Record<string, never>>

const modules = import.meta.glob<SvgComponent>('../svg/*.svg', {
    as: 'component',
    eager: true
})

const svgs = {} as Record<string, SvgComponent>

Object.keys(modules).forEach(key => {
    svgs[key.match(/\/([a-z_A-Z-]+)\.svg$/)?.[1] || ''] = modules[key]
})

const generateIcon = (component: Component) => {
    const CustomIcon = (props: IconComponentProps) => (
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
