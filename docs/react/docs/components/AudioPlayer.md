---
nav:
    title: 组件
    order: 1
group:
    title: 媒体
    order: 1
---

# 音频播放器

<code src='../../demo/AudioPlayer/link.tsx' title='使用链接' description='通过请求一个音频链接来播放音频'></code>
<code src='../../demo/AudioPlayer/file.tsx' title='使用文件' description='播放一个本地音频文件'></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ---- | --- | ---- | ----- |
| source | 需要播放的音频，可以是音频链接或者文件 | [Source](#source) | - |
| title | 标题 | `string` | [ID3](#id3) |
| artist | 创作者 | `string` | [ID3](#id3) |
| cover | 图片链接，传入 `false` 将一直不显示 | `string \| false` | [ID3](#id3) |
| loaded | 音频加载完成后的回调 | `() => void` | - |

### ID3
<!-- prettier-ignore -->
:::info{title=ID3解析}
如果你传入的是一个 MP3 格式的文件，会自动解析歌曲名/歌手/封面等信息
:::

### Source

`File | string | null`