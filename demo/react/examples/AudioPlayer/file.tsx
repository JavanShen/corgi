import { useState } from 'react'
import { Upload, Button, Space } from 'antd'
import { AudioPlayer } from '@corgii/react'

const AudioPlayerDemo = () => {
    const [file, setFile] = useState<null | Blob>(null)

    const beforeUpload = async (val: File) => {
        const arrayBuffer = await val.arrayBuffer()
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: val.type })
        setFile(blob)
    }

    return (
        <Space direction="vertical">
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
                <Button>选择文件</Button>
            </Upload>
            <AudioPlayer source={file} showVolumeControl />
        </Space>
    )
}

export default AudioPlayerDemo
