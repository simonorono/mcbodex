import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ShortcutProvider } from 'react-keybind'

import App from './App'
import store from './store'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: './' }).catch(console.log)
}

const root = createRoot(
  // @ts-ignore
  document.getElementById('app')
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShortcutProvider>
        <App />
      </ShortcutProvider>
    </Provider>
  </React.StrictMode>
)
