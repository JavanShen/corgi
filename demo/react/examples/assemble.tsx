import { Space } from 'antd'

const assemble = (demos: Record<string, () => JSX.Element>) => {
    const Demos = () => (
        <Space direction="vertical">
            {Object.keys(demos).map(key => {
                const Demo = demos[key]
                return <Demo key={key} />
            })}
        </Space>
    )

    return Demos
}

export default assemble
