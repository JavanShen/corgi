import styled from '@emotion/styled'

const padding = '5px 12px'
const width = 200

const List = styled.div()

const ListItem = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: width,
    borderRadius: 5,
    padding,
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,.06)'
    }
})

const TodoText = styled.span({
    letterSpacing: 1
})

const Header = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    padding
})

const AddTodoContainer = styled.div({
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
})

export { List, ListItem, TodoText, Header, AddTodoContainer }
