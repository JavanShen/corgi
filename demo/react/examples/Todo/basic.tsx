import { Todo } from '@corgwn/react'

const TodoDemo = () => (
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
    />
)

export default TodoDemo
