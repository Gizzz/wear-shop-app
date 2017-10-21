import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import storageHelper from '../utils/storage-helper'

function configureStore() {
  const preloadedState = storageHelper.loadState()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middlewares = [ thunk ]

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

  return store
}

export default configureStore
