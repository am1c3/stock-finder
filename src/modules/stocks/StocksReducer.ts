import { StockState } from "./types/StockState";
import { SEARCH_STOCK_BY_SYMBOL_SUCCESS, StockAction, SEARCH_STOCK_BY_SYMBOL, SEARCH_STOCK_BY_SYMBOL_FAIL, GET_STOCK_INFO, GET_STOCK_INFO_SUCCESS, GET_STOCK_INFO_FAIL, CLEAR_SEARCH_LIST } from "./types/ActionTypes";
const initialState: StockState= {
    searchLoading:false,
    stockInfoLoading:false,
    stockInfoError:'',
    searchError:'',
    stocks:[],
    stockInfo: {
        meta: {
            info:'',
            symbol:'',
            lastRefreshed:'',
            outputSize:'',
            timezone:''
        },
        values: []
    }
}
export default (state = initialState, action:StockAction ) => {
    switch(action.type) {
        case CLEAR_SEARCH_LIST:
            return {
                ...state,
                stocks:[]
            }
        case GET_STOCK_INFO:
            return {
                ...state,
                stockInfoLoading:true,
                stockInfoError:''
            }
        case GET_STOCK_INFO_SUCCESS:
            return {
                ...state,
                stockInfo:action.payload,
                stockInfoLoading:false
            }
        case GET_STOCK_INFO_FAIL:
            return {
                ...state,
                stockInfoLoading:false,
                stockInfoError:action.payload
            }
        case SEARCH_STOCK_BY_SYMBOL:
            return {
                ...state,
                searchLoading:true,
                searchError:''
            }
        case SEARCH_STOCK_BY_SYMBOL_SUCCESS:
            return {
                ...state,
                stocks:action.payload,
                searchLoading:false
            }
        case SEARCH_STOCK_BY_SYMBOL_FAIL:
            return {
                ...state,
                searchError:action.payload,
                searchLoading:false
            }
        default: 
        return state;
    }
}