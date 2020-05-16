import React from 'react'
import Plot from 'react-plotly.js'
import { StockInfo } from '../types/StockInfo'
interface Props {
    stockInfo: StockInfo
    mean: number;
    showAverage:boolean;
}
const Plotly: React.FunctionComponent<Props> = (props) =>  {
    const {stockInfo, mean, showAverage} = props
    return (
        <Plot
        data={[
          {
            x: stockInfo.values.map(item => item.date),
            y: stockInfo.values.map(item => item.open),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
            name: 'Open value'
          },
          showAverage ? {
            type: 'scatter',
            mode: 'lines+markers',
            x: [stockInfo.values[stockInfo.values.length - 1] && stockInfo.values[stockInfo.values.length - 1].date, stockInfo.values[0] && stockInfo.values[0].date],
            y: [mean, mean],
            marker: { color: 'blue' },
            name: 'Average'
          } : {}
        ]}
        layout={{ width: 854, height: 440 }}
        config={{
          scrollZoom:true
        }}
      />
    )
}
export default Plotly