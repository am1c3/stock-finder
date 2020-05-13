import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import StocksReducer from '../modules/stocks/StocksReducer'

export const reducers = combineReducers({
  stocks: StocksReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))
