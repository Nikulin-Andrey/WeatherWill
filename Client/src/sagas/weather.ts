import { put, call, takeLatest, select } from 'redux-saga/effects'

import { setUserAction, setOperationsAction, getOperationsAction, setAdressInfoAction, setAdressErrorAction } from '../actions'
import { LOG_IN, GET_OPERATIONS, GET_ADRESS } from '../constants'

function * watchExample (action) {
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

const DEFAULT_ADRESS_INFO = {
    coordinates: [27.5618225, 53.9024716],
    city: 'Минск',
    adress: 'Минск'
}

function * getAdressInfo (action) {
  const state = yield select()
  console.log(action.payload)

  if(action.payload === 'DEFAULT_ADRESS_INFO') {
    yield put(setAdressInfoAction(DEFAULT_ADRESS_INFO))

    return
  }

  try {
    const data = yield call(() => {
      return fetch(`https://nominatim.openstreetmap.org/search?q=${action.payload}&limit=1&format=geojson&addressdetails=1&accept-language=ru`)
        .then(response => response.json())
    })
    console.log(data.features[0])

    const {
        geometry: { coordinates },
        properties: { address: { city } }
    } = data.features[0]

    console.log(coordinates, city)
    if(!coordinates || !city) {
        throw new Error
    }

    yield put(setAdressInfoAction({ coordinates, city, adress: action.payload }))
    // yield put(getWeaherAction({ coordinates }))
  } catch (error) {
    yield put(setAdressErrorAction())
  }
}

function * root () {
  yield takeLatest(LOG_IN, watchExample)
  yield takeLatest(GET_ADRESS, getAdressInfo)
}

export default root
