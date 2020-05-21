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
import { STOCK_DATA_INTERVAL_TYPES, INTRADAY_INTERVALS, ALPHA_VENTAGE_TRANSLATE } from './constants'
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
    if(ALPHA_VENTAGE_TRANSLATE.getError(result)) {
      dispatch({
        type: GET_STOCK_INFO_FAIL,
        payload: ALPHA_VENTAGE_TRANSLATE.getError(result)
      })
      return
    }
    if(ALPHA_VENTAGE_TRANSLATE.getNote(result)) {
      dispatch({
        type: GET_STOCK_INFO_FAIL,
        payload: ALPHA_VENTAGE_TRANSLATE.getNote(result)
      })
      return
    }
      let dataType =  ALPHA_VENTAGE_TRANSLATE.daily
      if(type === STOCK_DATA_INTERVAL_TYPES.Monthly.value) {
        dataType = ALPHA_VENTAGE_TRANSLATE.monthly
      }
      if(type === STOCK_DATA_INTERVAL_TYPES.Weekly.value) {
        dataType = ALPHA_VENTAGE_TRANSLATE.weekly

      }
      if(type === STOCK_DATA_INTERVAL_TYPES.Intraday.value) {
        dataType = ALPHA_VENTAGE_TRANSLATE.intraday(interval)
      }
      console.log(result.data, dataType)
      const resultValues = result.data[dataType]
      // parse data
      const payload= {
        meta: {
          info:ALPHA_VENTAGE_TRANSLATE.getInfo(result.data),
          symbol: ALPHA_VENTAGE_TRANSLATE.getSymbol(result.data),
          lastRefreshed:ALPHA_VENTAGE_TRANSLATE.getLastRefreshed(result.data),
          timezone:ALPHA_VENTAGE_TRANSLATE.getTimezone(result.data)
        },
        values: Object.keys(resultValues).map(key => ({
          date: new Date(key),
          open: ALPHA_VENTAGE_TRANSLATE.getOpen(resultValues, key),
          close: ALPHA_VENTAGE_TRANSLATE.getClose(resultValues, key),
          high: ALPHA_VENTAGE_TRANSLATE.getHigh(resultValues, key),
          low: ALPHA_VENTAGE_TRANSLATE.getLow(resultValues, key),
          volume: ALPHA_VENTAGE_TRANSLATE.getVolume(resultValues, key),
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
      payload:ALPHA_VENTAGE_TRANSLATE.defaultError
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
   
    if(ALPHA_VENTAGE_TRANSLATE.getError(result)) {
      dispatch({
        type: SEARCH_STOCK_BY_SYMBOL_FAIL,
        payload: ALPHA_VENTAGE_TRANSLATE.getError(result)
      })
      return
    }
    if(ALPHA_VENTAGE_TRANSLATE.getNote(result)) {
      dispatch({
        type: SEARCH_STOCK_BY_SYMBOL_FAIL,
        payload: ALPHA_VENTAGE_TRANSLATE.getNote(result)
      })
      return
    }
    dispatch({
      type: SEARCH_STOCK_BY_SYMBOL_SUCCESS,
      payload: bestMatches.map(item => ({
        name: ALPHA_VENTAGE_TRANSLATE.getSearchName(item),
        location: ALPHA_VENTAGE_TRANSLATE.getSearchLocation(item),
        timezone: ALPHA_VENTAGE_TRANSLATE.getSearchTimezone(item),
        currency: ALPHA_VENTAGE_TRANSLATE.getSearchCurrency(item),
        symbol: ALPHA_VENTAGE_TRANSLATE.getSearchSymbol(item),
      }))
    })
  } catch (e) {
    dispatch({
      type: SEARCH_STOCK_BY_SYMBOL_FAIL,
      payload: ALPHA_VENTAGE_TRANSLATE.searchDefaultError
    })
  }
}
