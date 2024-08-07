import { put, call, takeLatest, select } from 'redux-saga/effects'

import { setUserAction, setOperationsAction, getOperationsAction, setAdressInfoAction, setAdressErrorAction, getWeaherAction } from '../actions'
import { LOG_IN, GET_OPERATIONS, GET_ADRESS, GET_WEATHER } from '../constants'

function * logInWorker (action) {
  try {
    const data = yield call(() => {
      return fetch('api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ ...action.payload }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
    })

    yield put(setUserAction(data))
  } catch (error) {
  }
}

function * getWeather(action) {
    const { user } = yield select()
    const [longitude, latitude] = user.adressInfo.coordinates
    try {
        const data = yield call(() => {
          return fetch(`api/weather/?lat=${latitude}&lon=${longitude}&service=${action.payload}`)
            .then(response => response.json())
        })

        yield put(setOperationsAction(data))
      } catch (error) {
      }
}

const DEFAULT_ADRESS_INFO = {
    coordinates: [27.5618225, 53.9024716],
    city: 'Минск',
    adress: 'Минск'
}

function * getAdressInfo (action) {
  if(action.payload === 'DEFAULT_ADRESS_INFO') {
    yield put(setAdressInfoAction(DEFAULT_ADRESS_INFO))
    return
  }

  try {

    const data = yield call(() =>
        fetch(`https://nominatim.openstreetmap.org/search?q=${action.payload}&limit=1&format=geojson&addressdetails=1&accept-language=ru`)
        .then(response => response.json())
    )

    const {
        geometry: { coordinates },
        properties: { address: { city } }
    } = data.features[0]

    if(!coordinates || !city) {
        throw new Error
    }

    yield put(setAdressInfoAction({ coordinates, city, adress: action.payload }))
    // yield put(getWeaherAction())
    // yield put(getWeaherAction({ coordinates }))
  } catch (error) {
    console.log(error)
    yield put(setAdressInfoAction(DEFAULT_ADRESS_INFO))
    // yield put(getWeaherAction({ coordinates: DEFAULT_ADRESS_INFO.coordinates }))
    yield put(setAdressErrorAction())
  }
}

function * root () {
  yield takeLatest(LOG_IN, logInWorker)
  yield takeLatest(GET_WEATHER, getWeather)
  yield takeLatest(GET_ADRESS, getAdressInfo)
}

export default root
