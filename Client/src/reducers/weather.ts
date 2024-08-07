import { createReducer } from '@reduxjs/toolkit'

import {
  setUserAction,
  logOutUserAction,
  setAdressErrorAction,
  setAdressInfoAction,
  setOperationsAction
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
  weatherInfo: {
    todayWeather: {
        serviceId: '',
        weatherByHours: [],
        otherWeather: {
          feelsLike: 0,
          pressure: 0,
          humidity: 0,
          windSpeed: 0,
          weatherType: 'clearSky'
        },
        dateAndTime: '',
        location: ''
      },
      weekWeather: {
        serviceId: '',
        dateAndTime: '',
        weatherByDays: [],
        location: ''
      }
  },
  adressError: false
}

const userReducer = createReducer(initialState, builder => {
  builder.addCase(setUserAction, (state, action) => ({
    ...state,
    ...action.payload,
    message: action.payload.message || null,
  }))
  builder.addCase(setOperationsAction, (state, action) => ({
    ...state,
    weatherInfo: action.payload
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
