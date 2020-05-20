import React from 'react'
import { Route } from 'react-router-dom'
import StockSearchPage from './pages/StockSearchPage'
import SingleStockPage from './pages/SingleStockPage'
import { STOCKS_PAGE_ROUTE } from '../../router/routes'

export default function StocksPage () {
  return (
    <>
      <Route exact path={STOCKS_PAGE_ROUTE} component={StockSearchPage} />
      <Route exact path={`${STOCKS_PAGE_ROUTE}/:id`} component={SingleStockPage} />
    </>
  )
}
