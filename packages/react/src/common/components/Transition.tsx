import { memo, useMemo, useRef } from 'react'
import { Transition as Tst } from 'react-transition-group'
import type { CSSProperties, ReactNode } from 'react'

interface TransitionProps {
    duration: number
    enter: CSSProperties
    entering?: CSSProperties
    exit: CSSProperties
    exiting?: CSSProperties
    enterDefault?: boolean
    defaultStyle?: CSSProperties
    mountOnEnter?: boolean
    unmountOnExit?: boolean
    children: ReactNode
}

/* eslint-disable react/jsx-props-no-spreading */

// TODO 分解 ...props
const Transition = ({
    duration,
    enter,
    entering = enter,
    exit,
    exiting = exit,
    enterDefault = true,
    defaultStyle: defaultSty,
    mountOnEnter = true,
    unmountOnExit = true,
    children,
    ...props
}: TransitionProps) => {
    const nodeRef = useRef(null)

    const defaultStyle: CSSProperties = useMemo(
        () => ({
            transition: [
                ...new Set([...Object.keys(enter), ...Object.keys(exit)])
            ]
                .map(item => `${item} ${duration}ms ease-in-out`)
                .join(),
            ...(enterDefault ? enter : exit),
            ...defaultSty
        }),
        [enter, exit, duration]
    )

    const transitionStyles: { [key in string]: CSSProperties } = useMemo(
        () => ({
            entering,
            entered: enter,
            exiting,
            exited: exit
        }),
        [enter, exit]
    )

    return (
        <Tst
            timeout={duration}
            nodeRef={nodeRef}
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
            {...props}
        >
            {transitionState => (
                <div
                    ref={nodeRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[transitionState]
                    }}
                >
                    {children}
                </div>
            )}
        </Tst>
    )
}

export default memo(Transition)
export type { TransitionProps }
