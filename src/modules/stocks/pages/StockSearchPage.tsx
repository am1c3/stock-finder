import React, { useState, useRef,useEffect } from 'react'
import {connect} from 'react-redux'
import debounce from 'lodash.debounce'
import SearchBar from '../../../components/SearchBar'
import StockSearchResults from '../StockSearchResults'
import { RootState } from '../../../store/types'
import {searchStocksBySymbol, clearSearchList} from '../StocksActions'

function StockSearchPage (props) {
  const [value, setValue] = useState('')
  useEffect(() => {
    return () => {
      props.clearSearchList()
    };
  }, [])
  const searchForStock = (value) => {
    props.searchStocksBySymbol(value)
  }
  const debouncedSearch = useRef(
    debounce(value => searchForStock(value), 300)
  ).current
  const searchValueChanged = (value:string) => {
    setValue(value)
    if(value === '') {
      props.clearSearchList()
    }  else {

      debouncedSearch(value)
    }
  }
  return (
    <>
      <SearchBar
        placeholder='Enter symbol'
        withClear
        onClear={()=> props.clearSearchList()}
        value={value} onChange={(value:string) => searchValueChanged(value)}
      />
      <div style={{ height: 24 }} />
      <StockSearchResults results={props.stocks}  loading={props.searchLoading}  />
    </>
  )
}
const mapState = (state: RootState) => ({
  stocks: state.stocks.stocks,
  searchLoading: state.stocks.searchLoading,
})

const mapDispatch = {
  searchStocksBySymbol,
  clearSearchList
}

const connector = connect(mapState, mapDispatch)
export default connector(StockSearchPage)