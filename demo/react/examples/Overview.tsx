import { Card, List, Image } from 'antd'
import { Link } from 'react-router-dom'
import componentsList from '../componentsList'

const hyphen = (str: string) => {
    const [first, ...rest] = str.split('')
    return [
        first.toLowerCase(),
        ...rest.reduce((pre, cur) => {
            const charCode = cur.charCodeAt(0)

            if (charCode >= 65 && charCode <= 90) {
                pre.push('-', cur.toLowerCase())
            } else {
                pre.push(cur)
            }

            return pre
        }, [] as string[])
    ].join('')
}

const Overview = () => (
    <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={componentsList}
        renderItem={({ name, label }) => (
            <List.Item>
                <Link to={`/components/${hyphen(name)}`}>
                    <Card
                        title={`${name} ${label}`}
                        bodyStyle={{ textAlign: 'center' }}
                        hoverable
                    >
                        <Image
                            height={160}
                            src={`https://github.com/JavanShen/corgi/blob/main/packages/assets/pic/${name}.png?raw=true`}
                            preview={false}
                        />
                    </Card>
                </Link>
            </List.Item>
        )}
    />
)

export default Overview
