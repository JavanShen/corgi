import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import RouteTable from './router'
import componentsList from './componentsList'

const component = import.meta.env.MODE

const Demo = componentsList.find(item => item.name === component)
    ? (await import(/* @vite-ignore */ `./examples/${component}`)).default
    : null

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm
            }}
        >
            {Demo ? (
                <Demo />
            ) : (
                <BrowserRouter>
                    <RouteTable />
                </BrowserRouter>
            )}
        </ConfigProvider>
    </React.StrictMode>
)
