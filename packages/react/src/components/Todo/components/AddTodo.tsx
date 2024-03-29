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
import { AddIcon, ConfirmIcon } from '@pembroke/icons'
import { AddTodoContainer } from '../styled'
import SwitchTransition from '../../../common/components/SwitchTransition'

interface AddTodoRef {
    clear: () => void
}

interface Props {
    onAdd?: (val: string) => void
    loading?: boolean
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
                transition: 'transform 220ms ease-in-out',
                border: 'none'
            }}
            icon={
                <AddIcon
                    css={css({
                        color: '#666666',
                        '&:hover': {
                            color: state
                                ? token.colorWarning
                                : token.colorPrimary
                        },
                        transition: 'color 220ms ease-in-out'
                    })}
                />
            }
            onClick={toogleAddState}
            aria-label="addBtn"
        />
    )
}

const ConfirmBtn = ({
    token,
    onConfirm,
    loading
}: {
    token: { colorSuccess: string }
    onConfirm: () => void
    loading?: boolean
}) => (
    <Button
        style={{
            transform: 'rotate(-45deg)',
            marginLeft: 5,
            border: 'none'
        }}
        type="link"
        icon={
            <ConfirmIcon
                style={{
                    transform: 'rotate(45deg)'
                }}
                css={css({
                    color: '#666666',
                    '&:hover': {
                        color: token.colorSuccess
                    },
                    transition: 'color 220ms ease-in-out'
                })}
            />
        }
        onClick={onConfirm}
        loading={loading}
        aria-label="addConfirmBtn"
    />
)

/* eslint-disable react/display-name */
const AddTodo = forwardRef<AddTodoRef, Props>(({ onAdd, loading }, ref) => {
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
        if (addVal.length > 0 && !loading) {
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
                        aria-label="addInput"
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
                {addVal.length > 0 || loading ? (
                    <ConfirmBtn
                        token={token}
                        onConfirm={handleConfirm}
                        loading={loading}
                    />
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
