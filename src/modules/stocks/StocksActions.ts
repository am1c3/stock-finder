import axios from 'axios'
import { ALPHA_VENTAGE_API_URL } from '../../api/apiRoutes'
import {AnyAction} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
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
export const clearSearchList = (): AppThunk => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: CLEAR_SEARCH_LIST
  })
}
export const getStockInfo = ( type: string, symbol:string): AppThunk => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: GET_STOCK_INFO
  })
  try {
    const result = await axios({
      method: 'get',
      url: `${ALPHA_VENTAGE_API_URL}&function=${type}&symbol=${symbol}`
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
      const resultValues = result.data['Time Series (Daily)']
      dispatch({
        type: GET_STOCK_INFO_SUCCESS,
        payload: {
          meta: {
            info:result.data['Meta Data']['1. Information'],
            symbol:result.data['Meta Data']['2. Symbol'],
            lastRefreshed:result.data['Meta Data']['3. Last Refreshed'],
            timezone:result.data['Meta Data']['5. Time Zone']
          },
          values: Object.keys(resultValues).map(key => ({
            date:key,
            open: resultValues[key]['1. open'],
            close: resultValues[key]['4. close'],
            high: resultValues[key]['2. high'],
            low: resultValues[key]['3. low'],
            volume: resultValues[key]['5. volume'],
          }))
        }
      })
  } catch (e) {
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
    if(!bestMatches) {
      dispatch({
        type: SEARCH_STOCK_BY_SYMBOL_FAIL,
        payload: 'No match found'
      })
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
