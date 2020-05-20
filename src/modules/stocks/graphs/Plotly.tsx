import React from 'react'
import Plot from 'react-plotly.js'
import { StockValue } from '../types/StockInfo'
interface Props {
    data: StockValue[]
    averageData: StockValue[];
    averageValueLabel:string;
    showAverage:boolean;
}
const Plotly: React.FunctionComponent<Props> = (props) =>  {
    const {data, averageData, showAverage, averageValueLabel} = props
    return (
        <Plot
        data={[
          {
            x: data.map(item => item.date),
            y: data.map(item => item.open),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
            name: 'Open value'
          },
          showAverage ? {
            type: 'scatter',
            mode: 'lines+markers',
            x:averageData.map(item => item.date),
            y: averageData.map(item => item[averageValueLabel]),
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