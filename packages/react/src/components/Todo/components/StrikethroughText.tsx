import { TodoText } from '../styled'

interface Props {
    isStrike: boolean
    children: string
}

const StrikethroughText = ({ isStrike, children }: Props) => {
    return isStrike ? (
        <TodoText>
            <del>{children}</del>
        </TodoText>
    ) : (
        <TodoText>{children}</TodoText>
    )
}

export default StrikethroughText
