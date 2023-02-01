import { TodoText, Line } from '../styled'
import Transition from '../../../common/components/Transition'

interface Props {
    isStriked: boolean
    children: string
}

const StrikethroughText = ({ isStriked, children }: Props) => {
    return (
        <TodoText>
            {children}
            <Transition
                defaultStyle={{ position: 'absolute', left: 0 }}
                in={!isStriked}
                duration={200}
                enter={{ width: '0%' }}
                exit={{ width: '100%' }}
                mountOnEnter={false}
                unmountOnExit={false}
            >
                <Line />
            </Transition>
        </TodoText>
    )
}

export default StrikethroughText
