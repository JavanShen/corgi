import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Card, Space, Checkbox, Button, Divider, theme } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTodo } from '@corgii/hooks'
import { css } from '@emotion/react'
import { TransitionGroup } from 'react-transition-group'
import type {
    TodoProps,
    TodoUpdateCb,
    TodoEvent,
    TodoList,
    TodoListItem
} from '@corgii/types'
import Transition from '../../common/components/Transition'
import { DeleteIcon } from '../../icons'
import StrikethroughText from './components/StrikethroughText'
import AddTodo from './components/AddTodo'
import type { AddTodoRef } from './components/AddTodo'
import { List, ListItem, Header } from './styled'

export type { TodoProps, TodoUpdateCb, TodoEvent, TodoList, TodoListItem }

interface CheckboxChangeEventCustome extends CheckboxChangeEvent {
    target: CheckboxChangeEvent['target'] & { 'aria-label': string }
}

const { useToken } = theme

const Todo = ({
    todoList,
    style,
    update
}: TodoProps & { style?: CSSProperties }) => {
    const { todos, complete, uncomplete, add, remove, event, addLoading } =
        useTodo(todoList)
    const { token } = useToken()
    const addTodoRef = useRef<AddTodoRef>(null)

    useEffect(() => {
        event('update', update)
        event('updated', type => {
            if (type === 'add') {
                addTodoRef?.current?.clear()
            }
        })
    }, [])

    const handleChange = ({ target }: CheckboxChangeEventCustome) => {
        const name = target['aria-label']
        if (target.checked) {
            complete(name)
        } else {
            uncomplete(name)
        }
    }

    const handleAdd = (val: string) => {
        add({ name: val, label: val, done: false })
    }

    return (
        <Card
            style={{
                display: 'inline-flex',
                width: 'max-content',
                ...style
            }}
        >
            <Header>
                <AddTodo
                    onAdd={handleAdd}
                    ref={addTodoRef}
                    loading={addLoading}
                />
            </Header>
            <Divider style={{ margin: '14px 0' }} />
            <List>
                <Space direction="vertical">
                    <TransitionGroup>
                        {todos.map(({ label, done, name, loadMap }) => (
                            <Transition
                                key={name}
                                duration={220}
                                entering={{
                                    opacity: 0,
                                    transform: 'translateX(30px)',
                                    maxHeight: 0
                                }}
                                enter={{
                                    opacity: 1,
                                    transform: 'translateX(0)',
                                    maxHeight: 100
                                }}
                                exit={{
                                    opacity: 0,
                                    transform: 'translateX(-30px)',
                                    maxHeight: 0
                                }}
                                defaultStyle={{
                                    transition: 'all 220ms ease-in-out'
                                }}
                            >
                                <ListItem key={name}>
                                    <Checkbox
                                        aria-label={name}
                                        checked={done}
                                        onChange={
                                            handleChange as (
                                                e: CheckboxChangeEvent
                                            ) => void
                                        }
                                    >
                                        <StrikethroughText isStrike={done}>
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
                                                    transition:
                                                        'fill 220ms ease-in-out'
                                                })}
                                            />
                                        }
                                        type="link"
                                        loading={loadMap.remove}
                                        onClick={() => {
                                            remove(name)
                                        }}
                                    />
                                </ListItem>
                            </Transition>
                        ))}
                    </TransitionGroup>
                </Space>
            </List>
        </Card>
    )
}

export default Todo
