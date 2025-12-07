import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CollageProvider } from './collageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CollageProvider>
      <App />
    </CollageProvider>
  </StrictMode>,
)
