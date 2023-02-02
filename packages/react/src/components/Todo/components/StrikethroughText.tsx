import { forwardRef, useImperativeHandle, useRef } from 'react'
import { TodoText, Line } from '../styled'
import Transition from '../../../common/components/Transition'

interface StrikethroughTextProps {
    isStriked: boolean
    children: string
}

interface StrikethroughTextRef {
    isEllipsis: boolean
}

export type { StrikethroughTextRef }

/* eslint-disable react/display-name */
const StrikethroughText = forwardRef<
    StrikethroughTextRef,
    StrikethroughTextProps
>(({ isStriked, children }, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null)

    useImperativeHandle(ref, () => ({
        isEllipsis: spanRef.current
            ? spanRef.current.scrollWidth > spanRef.current.clientWidth
            : false
    }))

    return (
        <TodoText>
            <span
                ref={spanRef}
                style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }}
            >
                {children}
            </span>
            <Transition
                defaultStyle={{ position: 'absolute', left: 0 }}
                in={!isStriked}
                duration={200}
                enter={{ width: '0%' }}
                exit={{ width: '100%' }}
                mountOnEnter={false}
                unmountOnExit={false}
            >
                <Line />
            </Transition>
        </TodoText>
    )
})

export default StrikethroughText
