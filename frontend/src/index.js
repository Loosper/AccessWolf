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

import 'array-flat-polyfill'
import './index.css'

if (!String.prototype.trim) {
  (function () {
    // Make sure we trim BOM and NBSP
    var trim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    // eslint-disable-next-line no-extend-native
    String.prototype.trim = function () {
      return this.replace(trim, '');
    };
  })();
}

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
