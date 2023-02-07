type TodoEvent = 'add' | 'complete' | 'uncomplete' | 'remove' | 'change'

type TodoListItem = {
    name: string
    label: string
    done: boolean
}

type LoadMap = {
    [K in Exclude<TodoEvent, 'add'>]: boolean
}

type TodoListItemWithLoad = TodoListItem & {
    loadMap: LoadMap
}

type TodoList = TodoListItem[]
type TodoListWithLoad = TodoListItemWithLoad[]

type TodoEventInfo = {
    add: {
        newTodo: TodoListItem
    }
    complete: {
        name: string
    }
    uncomplete: {
        name: string
    }
    remove: {
        name: string
    }
    change: {
        name: string
        newVal: string
        oldVal: string
    }
}

type TodoUpdateArg =
    | [type: 'add', payload: TodoEventInfo['add']]
    | [type: 'complete', payload: TodoEventInfo['complete']]
    | [type: 'uncomplete', payload: TodoEventInfo['uncomplete']]
    | [type: 'remove', payload: TodoEventInfo['remove']]
    | [type: 'change', payload: TodoEventInfo['change']]

type TodoUpdate = (
    ...arg: TodoUpdateArg
) => boolean | Promise<boolean> | void | Promise<void>

type TodoUpdateCb = TodoUpdate

type TodoUpdatedCb = (type: TodoEvent, newTodos: TodoList) => void

interface TodoProps {
    todoList: TodoList
    update?: TodoUpdateCb
    updated?: TodoUpdatedCb
}

export type {
    TodoProps,
    TodoListItem,
    TodoListItemWithLoad,
    TodoList,
    TodoListWithLoad,
    TodoEvent,
    TodoEventInfo,
    TodoUpdate,
    TodoUpdateCb,
    TodoUpdatedCb,
    LoadMap
}
