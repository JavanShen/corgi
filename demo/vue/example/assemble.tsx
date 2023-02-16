import type { DefineComponent } from 'vue'
import { Space } from 'ant-design-vue'

const assemble = (demos: Record<string, DefineComponent>) => {
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
