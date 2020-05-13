import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {reducers} from './store'
import { StockState } from '../modules/stocks/types/StockState'

export interface RootState{
    stocks:StockState;
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

