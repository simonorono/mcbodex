import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'

import App from './App'
import store from './store'

import './index.css'

(registerSW())()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
)
