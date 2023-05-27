import { all, fork } from 'redux-saga/effects'

import weather from './weather'

function * root () {
  yield all([
    fork(weather),
  ])
}

export default root
