import { SearchStock } from "./SearchStock"

export const GET_STOCK_INFO = 'GET_STOCK_INFO'
export const GET_STOCK_INFO_SUCCESS = 'GET_STOCK_INFO_SUCCESS'
export const GET_STOCK_INFO_FAIL = 'GET_STOCK_INFO_FAIL'
export const SEARCH_STOCK_BY_SYMBOL = 'SEARCH_STOCK_BY_SYMBOL'
export const SEARCH_STOCK_BY_SYMBOL_SUCCESS = 'SEARCH_STOCK_BY_SYMBOL_SUCCESS'
export const SEARCH_STOCK_BY_SYMBOL_FAIL = 'SEARCH_STOCK_BY_SYMBOL_FAIL'
export const CLEAR_SEARCH_LIST = 'CLEAR_SEARCH_LIST'
interface GetStockAction {
    type: typeof GET_STOCK_INFO
}
interface GetStockActionSuccess {
    type: typeof GET_STOCK_INFO_SUCCESS,
    payload: SearchStock
}

interface GetStockActionFail {
    type: typeof GET_STOCK_INFO_FAIL,
    payload: string
}
interface SearchStockAction {
    type: typeof SEARCH_STOCK_BY_SYMBOL
}
interface SearchStockActionSuccess {
    type: typeof SEARCH_STOCK_BY_SYMBOL_SUCCESS,
    payload: SearchStock
}

interface SearchStockActionFail {
    type: typeof SEARCH_STOCK_BY_SYMBOL_FAIL,
    payload: string
}
interface ClearSearchAction {
    type: typeof CLEAR_SEARCH_LIST
}
export type StockAction = GetStockAction | GetStockActionFail | GetStockActionSuccess
| SearchStockAction | SearchStockActionFail | SearchStockActionSuccess | ClearSearchAction