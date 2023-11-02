import styled from '@emotion/styled'
import styledWithToken from '../../../common/hoc/styledWithToken'

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

const Title = styledWithToken.div(({ token }) => ({
    fontSize: 22,
    textAlign: 'start',
    color: token?.colorText,
    ...textOmission
}))

const SubTitle = styledWithToken.div(({ token }) => ({
    fontSize: 16,
    color: token?.colorTextDescription,
    ...textOmission
}))

const SubTitle2 = styledWithToken.div(({ token }) => ({
    fontSize: 14,
    color: token?.colorTextDescription,
    ...textOmission
}))

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
