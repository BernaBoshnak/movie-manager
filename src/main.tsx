import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import ErrorContextProvider from '@components/context/ErrorContext'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ErrorContextProvider>
      <App />
    </ErrorContextProvider>
  </StrictMode>,
)
