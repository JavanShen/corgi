---
nav:
    title: 组件
    order: 2
group:
    title: 管理
    order: 2
---

# 待办事项

<code src='@corgwn/demo-react/examples/Todo/basic.tsx' title='默认' description='一个待办组件，添加任务，完成任务或者取消完成，删除任务'></code>

<code src='@corgwn/demo-react/examples/Todo/callback.tsx' title='回调' description='更新和更新完成都会触发回调，你可以在更新回调里控制是否更新，在更新完成回调里获取最新的数据'></code>

<code src='@corgwn/demo-react/examples/Todo/async.tsx' title='等待状态' description='当执行异步操作的时候会有等待状态'></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ---- | --- | ---- | ----- |
| todoList | [待办数据](#数据管理) | [TodoList](#todolist) | - |
| update | 更新回调，可以获取到触发更新的事件和一些相关内容，通过返回值来控制是否应用更新 | `(type, payload) => boolean \| void \| Promise<boolean> \| Promise<void>` | `() => {}` |
| updated | 更新完成回调，在这里获取最新的 `todoList` | `(type, newTodos) => void` | `() => {}` |

### 数据管理
<!-- prettier-ignore -->
:::info{title=数据的处理}
在组件内部对 `todoList` 进行了管理，所以不用手动更新 `todoList` 参数，`updated` 回调会一直返回最新的数据；当然你也可以传入一个新的 `todoList` 来重置数据
:::

### TodoList

`{
    name: string;
    label: string;
    done: boolean;
}[]`