import styled from '@emotion/styled'

const padding = '5px 12px'
const width = 200
const textWidth = width - 70

const List = styled.div()

const ListItem = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    borderRadius: 5,
    padding,
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,.06)'
    }
})

const TodoText = styled.div({
    maxWidth: textWidth,
    letterSpacing: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
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

const Line = styled.div({
    height: 2,
    width: '100%',
    backgroundColor: '#2d2d2d',
    borderRadius: 3
})

export { List, ListItem, TodoText, Header, AddTodoContainer, Line }
