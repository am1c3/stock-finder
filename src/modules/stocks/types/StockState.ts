import { SearchStock } from "./SearchStock";
import { StockInfo } from "./StockInfo";

export interface StockState {
    searchLoading:boolean;
    stocks: SearchStock[];
    stockInfo: StockInfo;
    stockInfoLoading:boolean;
    searchError:string;
    stockInfoError:string;
}