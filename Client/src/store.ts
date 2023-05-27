import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware,
]

const store = configureStore({ reducer, middleware })

sagaMiddleware.run(rootSaga)

export default store
