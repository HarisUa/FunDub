import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'; 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'
import { setUpSocket } from './actions'
import App from './components/App'
import Admin from './components/Admin'

//import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const logger = createLogger()
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger)
)

store.dispatch(setUpSocket())

render(
  <Provider store={store}>
	  <HashRouter>
	       <div>
	         <Route exact path="/" component={App} />
	         <Route exact path="/admin" component={Admin} />
           </div>
      </HashRouter>
  </Provider>,
  document.getElementById('root')
)
