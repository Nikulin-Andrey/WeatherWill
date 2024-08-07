import { createAction } from '@reduxjs/toolkit'

import { LOG_IN, SIGN_UP, SET_USER, LOG_OUT_USER, GET_ADRESS, GET_OPERATIONS, SET_OPERATIONS, SET_ADRESS_INFO, ERROR_ADRESS, GET_WEATHER } from '../constants'

export const setUserAction = createAction(SET_USER)
export const logOutUserAction = createAction(LOG_OUT_USER)

export const logInAction = createAction(LOG_IN)
export const signUpAction = createAction(SIGN_UP)

export const getAdressAction = createAction(GET_ADRESS)
export const setAdressInfoAction = createAction(SET_ADRESS_INFO)
export const setAdressErrorAction = createAction(ERROR_ADRESS)

export const getWeaherAction = createAction(GET_WEATHER)

export const getOperationsAction = createAction(GET_OPERATIONS)
export const setOperationsAction = createAction(SET_OPERATIONS)
