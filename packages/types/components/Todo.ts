type TodoListItem = {
    name: string
    label: string
    done: boolean
}

type TodoList = TodoListItem[]

type TodoEvent = 'add' | 'complete' | 'uncomplete' | 'remove' | 'change'

type TodoEventInfo = {
    add: {
        newTodo: TodoListItem
    }
    complete: {
        completeName: string
    }
    uncomplete: {
        uncompleteName: string
    }
    remove: {
        removeName: string
    }
    change: {
        changeName: string
        newVal: string
        oldVal: string
    }
}

type TodoUpdate = <T extends TodoEvent>(
    type: T,
    newTodoList: TodoList,
    payload: TodoEventInfo[T]
) => boolean | Promise<boolean>

type TodoUpdateCb = TodoUpdate

interface TodoProps {
    todoList: TodoList
    update: TodoUpdateCb
}

export type {
    TodoProps,
    TodoListItem,
    TodoList,
    TodoEvent,
    TodoUpdate,
    TodoUpdateCb
}
