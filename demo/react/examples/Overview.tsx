import { Card, List } from 'antd'
import { Link } from 'react-router-dom'
import componentsList from '../componentsList'

const Overview = () => (
    <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={componentsList}
        renderItem={({ name, label }) => (
            <List.Item>
                <Card title={label}>
                    <Link to={`/components/${name}`}>点我跳转</Link>
                </Card>
            </List.Item>
        )}
    />
)

export default Overview
