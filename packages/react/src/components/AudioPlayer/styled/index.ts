import styled from '@emotion/styled'

const textOmission = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
} as const

const AudioContent = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    minWidth: 170,
    maxWidth: 200,
    justifyContent: 'space-between'
})

const AudioContainer = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap'
})

const AudioMedia = styled.div({
    marginLeft: 10,
    borderRadius: 5,
    overflow: 'hidden',
    height: 175,
    width: 175
})

const Title = styled.div({
    fontSize: 22,
    color: 'black',
    ...textOmission
})

const SubTitle = styled.div({
    fontSize: 16,
    color: '#838383',
    ...textOmission
})

const SubTitle2 = styled.div({
    fontSize: 14,
    color: '#838383',
    ...textOmission
})

const FlexBetween = styled.div({
    display: 'flex',
    justifyContent: 'space-between'
})

export {
    AudioContainer,
    AudioContent,
    AudioMedia,
    FlexBetween,
    SubTitle,
    SubTitle2,
    Title
}
