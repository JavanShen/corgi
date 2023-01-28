import { useMemo, useState } from 'react'
import produce from 'immer'
import { EventEmitter } from '@corgii/utils'
import type {
    TodoList,
    TodoListItem,
    TodoUpdate,
    TodoUpdateCb
} from '@corgii/types'

export type { TodoList, TodoListItem, TodoUpdate, TodoUpdateCb }

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["draft"] }] */

const useTodo = (todoList: TodoList) => {
    const [todos, setTodos] = useState(todoList)
    const eventEmitter = useMemo(
        () =>
            new EventEmitter<{
                update: TodoUpdate
                updated: (...arg: Parameters<TodoUpdate>) => void
            }>(),
        []
    )

    const findTodoIndexByName = (name: string) => {
        return todos.findIndex(item => item.name === name)
    }

    const update: TodoUpdate = async (type, newTodo, payload) => {
        let res = true
        const callbackRes = await eventEmitter.emit(
            'update',
            type,
            newTodo,
            payload
        )

        if (callbackRes instanceof Array) {
            res = (await callbackRes[0]) ?? true
        } else {
            res = callbackRes ?? true
        }

        if (res) {
            setTodos(newTodo)
            eventEmitter.emit('updated', type, newTodo, payload)
        }

        return res
    }

    const add = (val: TodoListItem) => {
        update(
            'add',
            produce(todos, draft => {
                draft.push({ ...val })
            }),
            {
                newTodo: { ...val }
            }
        )
    }

    const toggleTodo = (name: string, val: boolean) => {
        const index = findTodoIndexByName(name)
        if (index > -1) {
            update(
                val ? 'complete' : 'uncomplete',
                produce(todos, draft => {
                    draft[index].done = val
                }),
                val
                    ? {
                          completeName: name
                      }
                    : {
                          uncompleteName: name
                      }
            )
        }
    }

    const complete = (name: string) => {
        toggleTodo(name, true)
    }

    const uncomplete = (name: string) => {
        toggleTodo(name, false)
    }

    const remove = (name: string) => {
        const index = findTodoIndexByName(name)
        if (index > -1) {
            update(
                'remove',
                produce(todos, draft => {
                    draft.splice(index, 1)
                }),
                {
                    removeName: name
                }
            )
        }
    }

    const change = (name: string, newVal: string) => {
        const index = findTodoIndexByName(name)
        if (index > -1) {
            update(
                'change',
                produce(todos, draft => {
                    draft[index].label = newVal
                }),
                {
                    changeName: name,
                    newVal,
                    oldVal: todos[index].label
                }
            )
        }
    }

    return {
        todos,
        add,
        complete,
        uncomplete,
        remove,
        change,
        event: eventEmitter.subscribe.bind(eventEmitter)
    }
}

export default useTodo
