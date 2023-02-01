import { Checkbox, Button, theme } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { css } from '@emotion/react'
import StrikethroughText from './StrikethroughText'
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
    target: CheckboxChangeEvent['target'] & { 'aria-label': string }
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

    const handleChange = ({ target }: CheckboxChangeEventCustome) => {
        const targetName = target['aria-label']
        onChange(target.checked, targetName)
    }

    return (
        <ListItem
            key={name}
            style={{
                opacity: done && !uncompleteLoading ? 0.6 : 1,
                transition: 'opacity 200ms'
            }}
        >
            <Checkbox
                aria-label={name}
                checked={done}
                disabled={disabled || completeLoading || uncompleteLoading}
                onChange={handleChange as (e: CheckboxChangeEvent) => void}
            >
                <StrikethroughText isStriked={done}>{label}</StrikethroughText>
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
                loading={removeLoading}
                onClick={() => {
                    onRemove(name)
                }}
            />
        </ListItem>
    )
}

export default TodoItem
