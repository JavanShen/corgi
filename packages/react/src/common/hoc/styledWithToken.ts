import styled from '@emotion/styled'
import { theme } from 'antd'
import { mapValues } from 'lodash-es'
import type { ElementType } from 'react'
import type { CreateStyledComponent } from '@emotion/styled'

type Tags = JSX.IntrinsicElements
type StyleWithToken = {
    [Tag in keyof Tags]: CreateStyledComponent<
        {
            theme?: Record<string, unknown>
            as?: ElementType
            token?: ReturnType<(typeof theme)['useToken']>['token']
        },
        Tags[Tag]
    >
}

const styledWithToken: StyleWithToken = mapValues(
    styled,
    // @ts-ignore 等待类型修补
    val => fn =>
        // @ts-ignore 等待类型修补
        val(props => {
            const { token } = theme.useToken()
            return fn({ ...props, token })
        })
)

export default styledWithToken
