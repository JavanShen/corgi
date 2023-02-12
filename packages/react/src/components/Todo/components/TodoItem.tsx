import { useRef, useState } from 'react'
import { Checkbox, Button, theme, Tooltip } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { css } from '@emotion/react'
import StrikethroughText from './StrikethroughText'
import type { StrikethroughTextRef as StrikeTextRef } from './StrikethroughText'
import { ListItem } from '../styled'
import { DeleteIcon } from '../../../icons'

interface TodoItemProps {
    name: string
    label: string
    done: boolean
    removeLoading: boolean
    completeLoading: boolean
    uncompleteLoading: boolean
    disabled?: boolean
    onChange: (state: boolean, name: string) => void
    onRemove: (name: string) => void
}

interface CheckboxChangeEventCustome extends CheckboxChangeEvent {
    target: CheckboxChangeEvent['target'] & { 'data-name': string }
}

const { useToken } = theme

const TodoItem = ({
    name,
    done,
    label,
    disabled,
    removeLoading,
    completeLoading,
    uncompleteLoading,
    onChange,
    onRemove
}: TodoItemProps) => {
    const { token } = useToken()
    const StrikethroughTextRef = useRef<StrikeTextRef>(null)
    const [tooltipShow, setTooltipShow] = useState(false)

    const handleChange = ({ target }: CheckboxChangeEventCustome) => {
        const targetName = target['data-name']
        onChange(target.checked, targetName)
    }

    const openTooltip = () => {
        if (StrikethroughTextRef.current?.isEllipsis) {
            setTooltipShow(true)
        }
    }

    const closeTooltip = () => {
        setTooltipShow(false)
    }

    return (
        <Tooltip title={label} open={tooltipShow} aria-label="tooltip">
            <ListItem
                key={name}
                style={{
                    opacity: done && !uncompleteLoading ? 0.6 : 1,
                    transition: 'opacity 200ms'
                }}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                aria-label="todo"
            >
                <Checkbox
                    data-name={name}
                    aria-label="checkbox"
                    checked={done}
                    disabled={disabled || completeLoading || uncompleteLoading}
                    onChange={handleChange as (e: CheckboxChangeEvent) => void}
                >
                    <StrikethroughText
                        ref={StrikethroughTextRef}
                        isStriked={done}
                    >
                        {label}
                    </StrikethroughText>
                </Checkbox>
                <Button
                    aria-label="removeBtn"
                    icon={
                        <DeleteIcon
                            css={css({
                                fill: '#666666',
                                '&:hover': {
                                    fill: token.colorError
                                },
                                transition: 'fill 220ms ease-in-out'
                            })}
                        />
                    }
                    type="link"
                    style={{ border: 'none' }}
                    loading={removeLoading}
                    onClick={() => {
                        onRemove(name)
                    }}
                />
            </ListItem>
        </Tooltip>
    )
}

export default TodoItem
