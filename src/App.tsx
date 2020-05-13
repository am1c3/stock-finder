import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import './assets/fonts/fonts.css'
import { store } from './store/store'
import MainRouter from './router/MainRouter'
function App () {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  )
}

export default App
