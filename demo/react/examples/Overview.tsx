import { Card, List, Image } from 'antd'
import { Link } from 'react-router-dom'
import componentsList from '../componentsList'

const Overview = () => (
    <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={componentsList}
        renderItem={({ name, label }) => (
            <List.Item>
                <Link to={`/components/${name}`}>
                    <Card title={`${name} ${label}`} hoverable>
                        <Image src={`../assets/${name}.png`} preview={false} />
                    </Card>
                </Link>
            </List.Item>
        )}
    />
)

export default Overview
