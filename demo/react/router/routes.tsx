import { Suspense, lazy, memo } from 'react'
import type { ComponentType } from 'react'
import componentsList from '../componentsList'

interface Props {
    loader(): Promise<{ default: ComponentType<unknown> }>
}

const Loadable = ({ loader }: Props) => {
    const LazyComponent = lazy(loader)

    const InnerComponent = () => {
        return (
            <Suspense>
                <LazyComponent />
            </Suspense>
        )
    }

    return memo(InnerComponent)
}

const routes = [
    {
        path: '/',
        key: '总览',
        element: Loadable({ loader: () => import('../examples/Overview') })
    },
    ...componentsList.map(({ name, label }) => ({
        path: `/components/${name}`,
        key: label,
        element: Loadable({
            loader: () => import(`../examples/${name}`)
        })
    }))
]

export default routes
