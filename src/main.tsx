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
  throw new Error("could not find root element")
}

const root = createRoot(appRoot)

/**
 * TODO: bring back strict mode after headlessui achieves full compatibility
 *       with react 18.
 *
 *       See: https://github.com/tailwindlabs/headlessui/issues/681
 */
root.render(
  <Provider store={store}>
    <ShortcutProvider>
      <App />
    </ShortcutProvider>
  </Provider>
)
