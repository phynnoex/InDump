import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CollageProvider } from './collageContext.tsx'
import { Provider } from 'react-redux'
import {store} from "./state/store.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <CollageProvider>
      <App />
    </CollageProvider>
    </Provider>
  </StrictMode>,
)
