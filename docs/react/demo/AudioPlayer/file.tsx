import { useState } from 'react'
import { Upload, Button, Space } from 'antd'
import { AudioPlayer } from '@corgii/react'

const AudioPlayerDemo = () => {
    const [file, setFile] = useState<null | File>(null)

    const beforeUpload = (val: File) => {
        setFile(val)
    }

    return (
        <Space direction="vertical">
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
                <Button>选择文件</Button>
            </Upload>
            <AudioPlayer source={file} />
        </Space>
    )
}

export default AudioPlayerDemo
