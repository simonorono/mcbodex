import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ShortcutProvider } from 'react-keybind'

import App from './App'

import store from './store'
import './css/index.css'
import './css/aspect-ratio.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: './' }).catch(console.log)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShortcutProvider>
        <App />
      </ShortcutProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)
