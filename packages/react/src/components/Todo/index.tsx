import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Card, Space, Divider } from 'antd'
import { useTodo } from '@corgii/hooks'
import { TransitionGroup } from 'react-transition-group'
import type {
    TodoProps,
    TodoUpdateCb,
    TodoUpdatedCb,
    TodoEvent,
    TodoList,
    TodoListItem
} from '@corgii/types'
import Transition from '../../common/components/Transition'
import AddTodo from './components/AddTodo'
import type { AddTodoRef } from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { List, Header } from './styled'

export type {
    TodoProps,
    TodoUpdateCb,
    TodoUpdatedCb,
    TodoEvent,
    TodoList,
    TodoListItem
}

const Todo = ({
    todoList,
    style,
    update,
    updated
}: TodoProps & { style?: CSSProperties }) => {
    const { todos, complete, uncomplete, add, remove, event, addLoading } =
        useTodo(todoList)
    const addTodoRef = useRef<AddTodoRef>(null)

    useEffect(() => {
        event(
            'update',
            update ||
                (() => {
                    // 默认 update
                })
        )
        event('updated', (type, newTodos) => {
            if (type === 'add') {
                addTodoRef?.current?.clear()
            }
            updated?.(type, newTodos)
        })
    }, [])

    const handleChange = (state: boolean, name: string) => {
        if (state) {
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
                                <TodoItem
                                    name={name}
                                    label={label}
                                    done={done}
                                    removeLoading={loadMap.remove}
                                    completeLoading={loadMap.complete}
                                    uncompleteLoading={loadMap.uncomplete}
                                    onChange={handleChange}
                                    onRemove={remove}
                                />
                            </Transition>
                        ))}
                    </TransitionGroup>
                </Space>
            </List>
        </Card>
    )
}

export default Todo
