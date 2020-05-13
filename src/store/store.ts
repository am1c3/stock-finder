import { createStore, combineReducers } from 'redux'
import StocksReducer from '../modules/stocks/StocksReducer'
const reducers = combineReducers({
  stocks: StocksReducer
})

export const store = createStore(reducers)
