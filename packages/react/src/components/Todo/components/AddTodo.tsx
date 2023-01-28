import {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from 'react'
import type { ChangeEventHandler } from 'react'
import { Button, Input, theme } from 'antd'
import type { InputRef } from 'antd'
import { css } from '@emotion/react'
import { AddIcon, ConfirmIcon } from '../../../icons'
import { AddTodoContainer } from '../styled'
import SwitchTransition from '../../../common/components/SwitchTransition'

interface AddTodoRef {
    clear: () => void
}

interface Props {
    onAdd?: (val: string) => void
}

export type { AddTodoRef }

const { useToken } = theme

const CancelBtn = ({
    state,
    toogleAddState,
    token
}: {
    state: boolean
    toogleAddState: () => void
    token: {
        colorPrimary: string
        colorWarning: string
    }
}) => {
    return (
        <Button
            type="link"
            style={{
                marginLeft: 5,
                transform: `rotate(${state ? -45 : 0}deg)`,
                transition: 'transform 220ms ease-in-out'
            }}
            icon={
                <AddIcon
                    css={css({
                        fill: '#666666',
                        '&:hover': {
                            fill: state
                                ? token.colorWarning
                                : token.colorPrimary
                        },
                        transition: 'fill 220ms ease-in-out'
                    })}
                />
            }
            onClick={toogleAddState}
        />
    )
}

const ConfirmBtn = ({
    token,
    onConfirm
}: {
    token: { colorSuccess: string }
    onConfirm: () => void
}) => (
    <Button
        style={{
            transform: 'rotate(-45deg)',
            marginLeft: 5
        }}
        type="link"
        icon={
            <ConfirmIcon
                style={{
                    transform: 'rotate(45deg)'
                }}
                css={css({
                    fill: '#666666',
                    '&:hover': {
                        fill: token.colorSuccess
                    },
                    transition: 'fill 220ms ease-in-out'
                })}
            />
        }
        onClick={onConfirm}
    />
)

/* eslint-disable react/display-name */
const AddTodo = forwardRef<AddTodoRef, Props>(({ onAdd }, ref) => {
    const { token } = useToken()
    const inputRef = useRef<InputRef>(null)
    const [isAdding, setIsAdding] = useState(false)
    const [addVal, setAddVal] = useState('')

    useImperativeHandle(ref, () => ({
        clear: () => {
            setAddVal('')
        }
    }))

    useEffect(() => {
        if (isAdding) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 200)
        }
    }, [isAdding])

    const toogleAddState = () => {
        setIsAdding(!isAdding)
    }

    const handleConfirm = () => {
        if (addVal.length > 0) {
            onAdd?.(addVal)
        }
    }

    const handleInput: ChangeEventHandler<HTMLInputElement> = ({
        target: { value }
    }) => {
        setAddVal(value)
    }

    return (
        <AddTodoContainer>
            <SwitchTransition
                duration={180}
                enter={{ transform: 'scaleX(1)' }}
                exit={{ transform: 'scaleX(0)' }}
                keyMap={['show', 'hidden']}
                state={isAdding}
                defaultStyle={{ transformOrigin: 'right' }}
            >
                {isAdding ? (
                    <Input
                        ref={inputRef}
                        value={addVal}
                        onChange={handleInput}
                        onPressEnter={handleConfirm}
                    />
                ) : null}
            </SwitchTransition>
            <SwitchTransition
                duration={220}
                enter={{ opacity: 1, transform: 'translateY(0)' }}
                exit={{ opacity: 0, transform: 'translateY(-30px)' }}
                keyMap={['confirm', 'cancel']}
                state={addVal.length > 0}
            >
                {addVal.length > 0 ? (
                    <ConfirmBtn token={token} onConfirm={handleConfirm} />
                ) : (
                    <CancelBtn
                        token={token}
                        toogleAddState={toogleAddState}
                        state={isAdding}
                    />
                )}
            </SwitchTransition>
        </AddTodoContainer>
    )
})

export default AddTodo
