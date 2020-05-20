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

export interface StockValue {
    open:number;
    high:number;
    low:number;
    close:number;
    volume:number;
    date:Date;
}