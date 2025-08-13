import { ConfigProvider, theme } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import Router from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Button: {
            colorBgContainer: '#b74040',
          },
          Card: {
            colorBgContainer: '#1D1D1D',
            colorBorderSecondary: 'none',
            bodyPadding: 8,
          },
          Drawer: {
            colorBgElevated: '#1D1D1D',
          },
          Input: {
            activeBorderColor: '#b74040',
          },
          Layout: {
            bodyBg: '#242424',
            siderBg: '#1E1D1F',
            headerBg: '#1E1D1F',
          },
        },
      }}
    >
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>
)
