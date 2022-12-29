import Icon from '@ant-design/icons'
import type {
    CustomIconComponentProps,
    IconComponentProps
} from '@ant-design/icons/lib/components/Icon'

const PauseSvg = () => (
    <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
    >
        <path
            d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
            fill="#5C5C66"
        />
    </svg>
)

const PlaySvg = () => (
    <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
    >
        <path
            d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
            fill="#5C5C66"
        />
    </svg>
)

const generateIcon = (component: IconComponentProps['component']) => {
    const CustomIcon = (props: Partial<CustomIconComponentProps>) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <Icon component={component} {...props} />
    )
    return CustomIcon
}

const PlayIcon = generateIcon(PlaySvg)

const PauseIcon = generateIcon(PauseSvg)

export { PlayIcon, PauseIcon }
