import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

import './index.css'

const history = createBrowserHistory()
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

render(
  <Provider store={store}>
    <Router history={history}> 
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root')
)

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
