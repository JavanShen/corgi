import { Routes, Route } from 'react-router-dom'
import routes from './routes'

const RouteTable = () => {
    return (
        <Routes>
            {routes.map(({ path, key, element: El }) => (
                <Route path={path} key={key} element={<El />} />
            ))}
        </Routes>
    )
}

export default RouteTable
