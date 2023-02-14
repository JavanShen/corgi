import { Todo } from '@corgwn/react'
import type { TodoUpdateCb, TodoUpdatedCb } from '@corgwn/react'

const TodoDemo = () => {
    const handleUpdate: TodoUpdateCb = () => {
        // 当发生更新事件会触发这个回调，如果返回 `false` 则会取消更新
    }

    const handleUpdated: TodoUpdatedCb = () => {
        // 更新完成后会触发这个回调，这里可以获取最新的数据
    }

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
            updated={handleUpdated}
        />
    )
}

export default TodoDemo
