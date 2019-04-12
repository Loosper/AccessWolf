import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const history = createBrowserHistory()
const store = createStore(rootReducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>, 
  document.getElementById('root')
)

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
