export interface StockInfo {
    meta: Meta;
    values: StockValue[];
}

interface Meta {
    info:string;
    symbol:string;
    lastRefreshed:string;
    outputSize:string;
    timezone:string;
}

interface StockValue {
    open:string;
    high:string;
    low:string;
    close:string;
    volume:string;
    date:string;
}