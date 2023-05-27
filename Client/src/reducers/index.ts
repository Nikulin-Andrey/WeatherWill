import { combineReducers } from 'redux'

import weatherReducer from './weather'

const reducer = combineReducers({
  user: weatherReducer,
})

export default reducer
