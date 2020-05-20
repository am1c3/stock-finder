import {StockValue} from '../modules/stocks/types/StockInfo'

interface MeanPoint {
    date:string;
    mean: number;
}
export const getMedianInBuckets = (data: StockValue[], bucketSize:number, label:string) : StockValue[] => {
    if(data.length === 0) {
        return []
    }
    let newData: StockValue[] = []

    for(let i=0; i< data.length - bucketSize ; i++) {
        let currentMean = 0 
        for(let j = i ; j < i + bucketSize; j++) {
            currentMean += data[j][label]
        }
        currentMean = +(currentMean/ bucketSize).toFixed(2)
        newData.push({
            ...data[i],
            [label]: currentMean
        })
    }
    newData.push(data[data.length - 1])
    return newData
}