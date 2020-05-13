import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { STOCK_FIINDER_ROUTE, HOME_ROUTE } from './routes'
import StocksPage from '../modules/stocks/StocksPage'
import HomePage from '../modules/home/HomePage'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainRouter () {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={STOCK_FIINDER_ROUTE} component={StocksPage} />
        <Route path={HOME_ROUTE} component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  )
}
