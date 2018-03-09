import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'
import { setUpSocket } from './actions'
import App from './components/App'

const logger = createLogger()
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger)
)

store.dispatch(setUpSocket())

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
