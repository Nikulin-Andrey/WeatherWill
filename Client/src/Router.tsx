import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Route, Routes } from 'react-router-dom'

import BasicLayout from './components/layouts/BasicLayout'
import MainPage from './components/pages/MainPage'
import LogInPage from './components/pages/LogInPage'
import AdminPage from './components/pages/AdminPage'

const Router = () => {
  return (
    <BasicLayout>
      <Routes>
        <Route
          path="/"
          element={ <MainPage /> }
        >
        </Route>
        <Route
            path="/login"
            element={ <LogInPage /> }
        />
        <Route
            path="/admin"
            element={ <AdminPage /> }
        />
      </Routes>
    </BasicLayout>
  )
}

export default Router
