import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,  applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'
import rootReducer from './redux/reducers'
import storageHelper from './utils/storage-helper'

// material-ui's implementation detail
injectTapEventPlugin()

const preloadedState = storageHelper.loadState()
const middlewares = [ thunk ]
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(createLogger())
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middlewares)),
)

store.subscribe(() => {
  const stateToSave = {}
  stateToSave.entities = {}
  stateToSave.entities.cartEntries = store.getState().entities.cartEntries

  storageHelper.saveState(stateToSave)
})

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
