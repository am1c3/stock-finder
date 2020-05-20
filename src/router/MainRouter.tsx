import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { STOCKS_PAGE_ROUTE, HOME_ROUTE } from './routes'
import StocksRouter from '../modules/stocks/StocksRouter'
import HomePage from '../modules/home/HomePage'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PageWrapper from '../components/PageWrapper'
const MainWrapper = styled.div`
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  @media only screen and (max-width: 950px) {
    padding:24px;
  }
`
export default function MainRouter () {
  return (
    <MainWrapper>

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
    </MainWrapper>
  )
}
