import { useEffect, useRef } from 'react'
import type { CSSProperties, FC } from 'react'
import { Card, Space, Divider } from 'antd'
import { useTodo } from '@corgwn/hooks'
import { TransitionGroup } from 'react-transition-group'
import type {
    TodoProps,
    TodoUpdateCb,
    TodoUpdatedCb,
    TodoEvent,
    TodoList,
    TodoListItem
} from '@corgwn/types'
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

// TODO 更加合理的宽高控制
const Todo: FC<TodoProps & { style?: CSSProperties }> = ({
    todoList,
    style,
    update,
    updated
}) => {
    const {
        todos,
        complete,
        uncomplete,
        add,
        remove,
        event,
        addLoading,
        unevent
    } = useTodo(todoList)
    const addTodoRef = useRef<AddTodoRef>(null)

    useEffect(() => {
        const updateCb =
            update ||
            (() => {
                // 默认 update
            })

        const updatedCb: TodoUpdatedCb = (type, newTodos) => {
            updated?.(type, newTodos)
        }

        event('update', updateCb)
        event('updated', updatedCb)

        return () => {
            unevent('update', updateCb)
            unevent('updated', updatedCb)
        }
    }, [todoList])

    useEffect(() => {
        if (addLoading === false) {
            addTodoRef?.current?.clear()
        }
    }, [addLoading])

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
