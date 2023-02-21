[![npm (tag)](https://img.shields.io/npm/v/@corgwn/hooks/alpha?label=%40corgwn%2Fhooks)](https://www.npmjs.com/package/@corgwn/hooks)

包含了 [@corgwn/react](https://corgi-nu.vercel.app/) 组件中完整的功能，可以用来打造你自己的组件

## 安装

---

````shell
npm i @corgwn/hooks@alpha
````

## useAudioPlayer

---

````JavaScript
import { useAudioPlayer } from '@corgwn/hooks'

const { play }  = useAudioPlayer('xxx.mp3')
````

#### 返回

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| currentTime | 当前时间 | `number` | 秒为单位 |
| totalTime | 总时长 | `number` | 秒为单位 |
| currentTimeText | 总时长的格式化文本 | `string` | `mm:ss` 格式 |
| totalTimeText | 当前时间的格式化文本 | `string` | `mm:ss` 格式 |
| updateTime | 更新当前时间 | `(val: number) => void` | 只会更新 hook 中的时间
| jump | 更新当前时间 | `(val: number) => void` | 更新播放器的时间，同时 hook 中的时间也会自动更新
| volume | 音量 | `number \| null` | 范围0-100，静音状态下为 null |
| updateVolume | 更新音量 | `(val: number) => void` | 超出范围的值会被处理成边界值 |
| mute | 静音 | `() => void` | - |
| unmute | 取消静音 | `() => void` | 会将音量恢复为之前的大小 |
| isPlay | 是否是播放状态 | `boolean` | - |
| isCanPlay | 是否可以播放 | `boolean` | - |
| play | 播放 | `() => void` | - |
| pause | 暂停 | `() => void` | - |
| imageSrc | ID3 解析的歌曲封面 | `string` | - |
| title | ID3 解析的歌曲名 | `string` | - |
| artist | ID3 解析的歌曲创作者 | `string` | - |

#### 参数

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| source | 音频链接或文件 | `string | File | Blob` | - |
| loaded | 音频加载完成后的回调函数 | `() => void` | 可选 |

## useTodo

---

````JavaScript
import { useTodo } from '@corgwn/hooks'

const { add } = useTodo([{
    name: 'eat'，,
    label: '吃饭',
    done: false
}])
````

#### 返回

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| todos | 待办数据 | `(TodoListItem & LoadMap)[]` | 同时会有一个 `loadMap` 属性包含了各种事件的加载状态 |
| addLoading | 新增的加载状态 | `boolean` | - |
| add | 新增待办 | `(val: TodoListItem) => Promise<void>` | - |
| remove | 移除待办 | `(name: string) => Promise<void>` | - |
| complete | 完成待办 | `(name: string) => Promise<void>` | - |
| uncomplete | 取消已完成 | `(name: string) => Promise<void>` | - |
| change | 更新待办 | `(name: stirng, newVal: string) => Promise<void>` |
| event | 监听事件 | `(event: 'update' \| 'updated', callback) => void` | 可以在这里监听更新和更新完成事件，其中更新回调可以返回 `false` 来取消此次更新，更新完成回调会获取到最新的数据 |

#### 参数

| 参数 | 说明 | 类型 | 备注 |
| --- | --- | --- | --- |
| todoList | 待办数据 | `TodoListItem[]` | - |