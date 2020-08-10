import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import rootReducer from './reducer'
import rootSaga from './saga'
import storage from 'redux-persist/lib/storage'
import { useMemo } from 'react'

let store

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['auth', 'userInfo', 'exerciseReslt'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(persistedReducer, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })