import { Todo } from '@corgwn/react'
import type { TodoUpdateCb } from '@corgwn/react'

const TodoDemo = () => {
    const handleUpdate: TodoUpdateCb = () =>
        new Promise<boolean>(res => {
            setTimeout(() => {
                res(true)
            }, 2000)
        })

    return (
        <Todo
            todoList={[
                {
                    label: '吃饭',
                    name: 'eat',
                    done: false
                },
                {
                    label: '睡觉',
                    name: 'sleep',
                    done: true
                }
            ]}
            update={handleUpdate}
        />
    )
}

export default TodoDemo
