import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { STOCKS_PAGE_ROUTE, HOME_ROUTE } from './routes'
import StocksRouter from '../modules/stocks/StocksRouter'
import HomePage from '../modules/home/HomePage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageWrapper from '../components/PageWrapper'

export default function MainRouter () {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Router>
        <Header />
        <PageWrapper>
          <Switch>
            <Route path={STOCKS_PAGE_ROUTE} component={StocksRouter} />
            <Route path={HOME_ROUTE} component={HomePage} />
          </Switch>
        </PageWrapper>
        <Footer />

      </Router>
    </div>
  )
}
