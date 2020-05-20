import axios from 'axios'
import { ALPHA_VENTAGE_API_URL } from '../../api/apiRoutes'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import { AppThunk } from '../../store/types'
import {
  SEARCH_STOCK_BY_SYMBOL,
  SEARCH_STOCK_BY_SYMBOL_FAIL,
  SEARCH_STOCK_BY_SYMBOL_SUCCESS,
  GET_STOCK_INFO,
  GET_STOCK_INFO_FAIL,
  GET_STOCK_INFO_SUCCESS,
  CLEAR_SEARCH_LIST
} from './types/ActionTypes'
import { STOCK_DATA_INTERVAL_TYPES, INTRADAY_INTERVALS } from './pages/SingleStockPage'
export const clearSearchList = (): AppThunk => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: CLEAR_SEARCH_LIST
  })
}
export const getStockInfo = ( type: string, symbol:string, interval:string): AppThunk => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: GET_STOCK_INFO
  })
  // cache all calls for a day
  let cachedData = localStorage.getItem(`${new Date().getDate() + new Date().getMonth()}`)
  const parsedData = cachedData && JSON.parse(cachedData)
  if(parsedData && parsedData[symbol+type+interval]) {
    const stockInfo = parsedData[symbol+type+interval]
    dispatch({
      type:GET_STOCK_INFO_SUCCESS,
      payload: {
        ...stockInfo,
        values: stockInfo.values.map(item => ({
        ...item,
        date: new Date(item.date)
      }))
    }})
    return
  }
  try {
    let url = `${ALPHA_VENTAGE_API_URL}&function=${type}&symbol=${symbol}&interval=${interval}`
   
    const result = await axios({
      method: 'get',
      url
    })
    if(result.data['Error Message']) {
      dispatch({
        type: GET_STOCK_INFO_FAIL,
        payload: result.data['Error Message']
      })
      return
    }
    if(result.data['Note']) {
      dispatch({
        type: GET_STOCK_INFO_FAIL,
        payload: result.data['Note']
      })
      return
    }
      let dataType = 'Time Series (Daily)'
      if(type === 'TIME_SERIES_MONTHLY') {
        dataType = 'Monthly Time Series'
      }
      if(type === 'TIME_SERIES_WEEKLY') {
        dataType = 'Weekly Time Series'

      }
      if(type === 'TIME_SERIES_INTRADAY') {
        dataType = `Time Series (${interval})`

      }
      console.log(result.data, dataType)
      const resultValues = result.data[dataType]
      // parse data
      const payload= {
        meta: {
          info:result.data['Meta Data']['1. Information'],
          symbol:result.data['Meta Data']['2. Symbol'],
          lastRefreshed:result.data['Meta Data']['3. Last Refreshed'],
          timezone:result.data['Meta Data']['5. Time Zone'] || result.data['Meta Data']['4. Time Zone']
        },
        values: Object.keys(resultValues).map(key => ({
          date: new Date(key),
          open: +resultValues[key]['1. open'],
          close: +resultValues[key]['4. close'],
          high: +resultValues[key]['2. high'],
          low: +resultValues[key]['3. low'],
          volume: +resultValues[key]['5. volume'],
        }))
      }
      localStorage.clear()
      // remove cache from other days and keep only the current day cache
      if(!parsedData) {
        localStorage.setItem(`${new Date().getDate() + new Date().getMonth()}`, JSON.stringify({
          [symbol+type+interval]: payload
        }))
      } else {
        localStorage.setItem(`${new Date().getDate() + new Date().getMonth()}`, JSON.stringify({
          ...parsedData,
          [symbol+type+interval]: payload
        }))
      }
     
      dispatch({
        type: GET_STOCK_INFO_SUCCESS,
        payload })
  } catch (e) {
    console.log(e)
    dispatch({
      type: GET_STOCK_INFO_FAIL,
      payload:'Something went wrong'
    })
  }
}


export const searchStocksBySymbol = ( keywords:string): AppThunk => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: SEARCH_STOCK_BY_SYMBOL
  })
  try {
   
    const result = await axios({
      method: 'get',
      url: `${ALPHA_VENTAGE_API_URL}&function=SYMBOL_SEARCH&keywords=${keywords}`
    })
    const {bestMatches} = result.data
   
    if(result.data['Error Message']) {
      dispatch({
        type: SEARCH_STOCK_BY_SYMBOL_FAIL,
        payload: result.data['Error Message']
      })
      return
    }
    if(result.data['Note']) {
      dispatch({
        type: SEARCH_STOCK_BY_SYMBOL_FAIL,
        payload: result.data['Note']
      })
      return
    }
    dispatch({
      type: SEARCH_STOCK_BY_SYMBOL_SUCCESS,
      payload: bestMatches.map(item => ({
        name: item['2. name'],
        location: item['4. region'],
        timezone: item['7. timezone'],
        currency: item['8. currency'],
        symbol: item['1. symbol'],
      }))
    })
  } catch (e) {
    dispatch({
      type: SEARCH_STOCK_BY_SYMBOL_FAIL,
      payload: 'Something went wrong'
    })
  }
}
