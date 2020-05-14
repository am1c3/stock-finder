import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import SearchBar from '../../../components/SearchBar'
import StockSearchResults from '../StockSearchResults'
import { RootState } from '../../../store/types'
import { searchStocksBySymbol, clearSearchList } from '../StocksActions'
import ErrorDialog from '../../../components/ErrorDialog'

function StockSearchPage(props) {
  const [value, setValue] = useState('')
  const {searchError, stocks, searchLoading, clearSearchList, searchStocksBySymbol} = props
  useEffect(() => {
    return () => {
      clearSearchList()
    };
  }, [])
  const searchForStock = (value) => {
    searchStocksBySymbol(value)
  }
  const debouncedSearch = useRef(
    debounce(value => searchForStock(value), 300)
  ).current
  const searchValueChanged = (value: string) => {
    setValue(value)
    if (value === '') {
      props.clearSearchList()
    } else {

      debouncedSearch(value)
    }
  }
  return (
    <>
      <SearchBar
        placeholder='Enter symbol'
        withClear
        onClear={() => clearSearchList()}
        value={value} onChange={(value: string) => searchValueChanged(value)}
      />
      <div style={{ height: 24 }} />
      {searchError ?
        <ErrorDialog description={searchError} onClick={() => {
          searchValueChanged(value)
        }} buttonText='Retry' />
        : <StockSearchResults results={stocks} loading={searchLoading} />
      }

    </>
  )
}
const mapState = (state: RootState) => ({
  stocks: state.stocks.stocks,
  searchLoading: state.stocks.searchLoading,
  searchError: state.stocks.searchError
})

const mapDispatch = {
  searchStocksBySymbol,
  clearSearchList
}

const connector = connect(mapState, mapDispatch)
export default connector(StockSearchPage)