import { createReducer } from '@reduxjs/toolkit'

import {
  setUserAction,
  logOutUserAction,
  setAdressErrorAction,
  setAdressInfoAction
} from '../actions'

const initialState = {
  token: null,
  email: null,
  userId: null,
  adressInfo: {
    city: "",
    coordinates: [],
    adress: ""
  },
  adressError: false
}

const userReducer = createReducer(initialState, builder => {
  builder.addCase(setUserAction, (state, action) => ({
    ...state,
    ...action.payload,
    message: action.payload.message || null,
  }))

  builder.addCase(setAdressInfoAction, (state, action) => ({
    ...state,
    adressInfo: action.payload,
  }))
  builder.addCase(setAdressErrorAction, (state, action) => ({
    ...state,
    adressError: true,
  }))

  builder.addCase(logOutUserAction, () => initialState)
})

export default userReducer
