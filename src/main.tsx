import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ShortcutProvider } from 'react-keybind'

import App from './App'
import store from './store'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: './' }).catch(console.log)
}

const appRoot = document.getElementById('app')

if (appRoot === null) {
  throw new Error('could not find root element')
}

const root = createRoot(appRoot)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShortcutProvider>
        <App />
      </ShortcutProvider>
    </Provider>
  </React.StrictMode>
)
