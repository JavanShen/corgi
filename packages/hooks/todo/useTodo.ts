import { useMemo, useState } from 'react'
import { current } from 'immer'
import { useImmerReducer } from 'use-immer'
import type { ImmerReducer } from 'use-immer'
import { EventEmitter } from '@corgii/utils'
import type {
    TodoList,
    TodoListItem,
    TodoListWithLoad,
    TodoListItemWithLoad,
    TodoUpdate,
    TodoUpdateCb,
    TodoUpdatedCb,
    TodoEvent,
    TodoEventInfo,
    LoadMap
} from '@corgii/types'

export type {
    TodoList,
    TodoListItem,
    TodoListWithLoad,
    TodoListItemWithLoad,
    TodoUpdate,
    TodoUpdateCb,
    TodoUpdatedCb,
    TodoEvent,
    TodoEventInfo
}

type EventEmitterInit = {
    update: TodoUpdateCb
    updated: TodoUpdatedCb
}

type reducerAction =
    | (TodoEvent extends infer T
          ? T extends 'add'
              ? { type: 'add'; newTodo: TodoListItemWithLoad }
              : T extends 'change'
              ? { type: 'change'; name: string; newVal: string }
              : { type: T; name: string }
          : never)
    | {
          type: 'loading'
          state: boolean
          name: string
          event: Exclude<TodoEvent, 'add'>
      }

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["draft"] }] */

const defaultLoadMap = (): LoadMap => ({
    remove: false,
    change: false,
    complete: false,
    uncomplete: false
})

const handleLoadProp = <T extends 'load' | 'unload'>(
    todoList: T extends 'load' ? TodoList : TodoListWithLoad,
    type: T
) => {
    return (
        type === 'load'
            ? todoList.map(todo => ({
                  ...todo,
                  loadMap: defaultLoadMap()
              }))
            : ((todoList as TodoListWithLoad).map(todo => {
                  const { loadMap, ...rest } = todo
                  return { ...rest }
              }) as TodoList)
    ) as T extends 'load' ? TodoListWithLoad : TodoList
}

const findTodoIndexByName = (
    name: string,
    todos: TodoList | TodoListWithLoad
) => {
    return todos.findIndex(item => item.name === name)
}

const initReducer = (emitter: EventEmitter<EventEmitterInit>) => {
    const reducer: ImmerReducer<TodoListWithLoad, reducerAction> = (
        todos,
        action
    ) => {
        const index =
            action.type === 'add' ? -1 : findTodoIndexByName(action.name, todos)

        if (index > -1 || action.type === 'add') {
            switch (action.type) {
                case 'add':
                    todos.push(action.newTodo)
                    break
                case 'complete':
                    todos[index].done = true
                    break
                case 'uncomplete':
                    todos[index].done = false
                    break
                case 'remove':
                    todos.splice(index, 1)
                    break
                case 'change':
                    todos[index].label = action.newVal
                    break
                case 'loading':
                    todos[index].loadMap[action.event] = action.state
                    break
                /* c8 ignore next */
                default:
            }

            if (action.type !== 'loading')
                emitter.emit(
                    'updated',
                    action.type,
                    handleLoadProp(current(todos), 'unload')
                )
        }
    }

    return reducer
}

const useTodo = (todoList: TodoList) => {
    const eventEmitter = useMemo(
        () => new EventEmitter<EventEmitterInit>(),
        [todoList]
    )
    const reducer = useMemo(() => initReducer(eventEmitter), [todoList])
    const todoListWithLoad = useMemo(
        () => handleLoadProp(todoList, 'load'),
        [todoList]
    )
    const [todos, dispatchTodos] = useImmerReducer(reducer, todoListWithLoad)
    const [addLoading, setAddLoading] = useState(false)

    const setLoad = (
        name: string,
        event: Exclude<TodoEvent, 'add'>,
        state: boolean
    ) => {
        dispatchTodos({ type: 'loading', name, event, state })
    }

    const update: TodoUpdate = async (...arg) => {
        const [type, payload] = arg

        let res = true

        if (type === 'add') {
            if (findTodoIndexByName(payload.newTodo.name, todos) > -1)
                return false
        } else {
            setLoad(payload.name, type, true)
        }

        try {
            const callbackRes = await eventEmitter.emit('update', ...arg)

            if (callbackRes instanceof Array) {
                res = (await callbackRes[0]) ?? true
            } else {
                res = callbackRes ?? true
            }
        } catch (e) {
            res = false
        }

        if (type !== 'add') setLoad(payload.name, type, false)

        return res
    }

    const add = async (val: TodoListItem) => {
        setAddLoading(true)

        const res = await update('add', {
            newTodo: { ...val }
        })

        if (res)
            dispatchTodos({
                type: 'add',
                newTodo: { ...val, loadMap: defaultLoadMap() }
            })

        setAddLoading(false)
    }

    const complete = async (name: string) => {
        const res = await update('complete', { name })
        if (res) dispatchTodos({ type: 'complete', name })
    }

    const uncomplete = async (name: string) => {
        const res = await update('uncomplete', { name })
        if (res) dispatchTodos({ type: 'uncomplete', name })
    }

    const remove = async (name: string) => {
        const res = await update('remove', {
            name
        })
        if (res) dispatchTodos({ type: 'remove', name })
    }

    const change = async (name: string, newVal: string) => {
        const index = findTodoIndexByName(name, todos)
        const res = await update('change', {
            name,
            newVal,
            oldVal: todos[index].label
        })
        if (res) dispatchTodos({ type: 'change', name, newVal })
    }

    return {
        todos,
        add,
        complete,
        uncomplete,
        remove,
        change,
        event: eventEmitter.subscribe.bind(eventEmitter),
        addLoading
    }
}

export default useTodo
