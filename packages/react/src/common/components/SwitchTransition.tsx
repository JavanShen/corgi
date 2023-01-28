import { memo } from 'react'
import { SwitchTransition as Switch } from 'react-transition-group'
import Transition from './Transition'
import type { TransitionProps } from './Transition'

interface SwitchTransitionProps
    extends Omit<TransitionProps, 'key' | 'name' | 'in'> {
    keyMap: [string, string]
    state: boolean
}

/* eslint-disable react/jsx-props-no-spreading */

// TODO 分解 ...props
const SwitchTransition = ({
    keyMap: [key1, key2],
    state,
    children,
    ...props
}: SwitchTransitionProps) => {
    return (
        <Switch>
            <Transition key={state ? key1 : key2} {...props}>
                {children}
            </Transition>
        </Switch>
    )
}

export type { SwitchTransitionProps }
export default memo(SwitchTransition)
