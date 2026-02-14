// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Make sure the .tsx is here if App is a tsx file
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)