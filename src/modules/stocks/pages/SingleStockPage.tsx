import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { RootState } from '../../../store/types'
import { getStockInfo } from '../StocksActions'
import timezone from '../../../assets/icons/time.svg'
import location from '../../../assets/icons/location.svg'
import Loader from '../../../components/Loader'
import ErrorDialog from '../../../components/ErrorDialog'
import arrowLeft from '../../../assets/icons/arrow-left.svg'
import Plotly from '../graphs/Plotly'
import D3Stock from '../graphs/D3Stock'
import { getMedianInBuckets } from '../../../helpers/dataManipulation'
import { StockValue } from '../types/StockInfo'
import {
  GoBack,
  Details,
  DetailsItem,
  Symbol,
  Icon,
  TopSide,
  BottomSide,
  Wrapper
} from '../styles'
import SinglePageFilters from '../SinglePageFilters'
import { SingleOption } from '../../../components/Select'
import { STOCK_DATA_INTERVAL_TYPES, INTRADAY_INTERVALS, GRAPH_COMPONENT_TYPE, GRAPH_TYPE } from '../constants'


function SingleStockPage(props) {
  const { getStockInfo, stockInfo, stockInfoError, stockInfoLoading } = props

  const history = useHistory()
  const [startDate, setStartDate] = useState('')
  const [intradayInterval, setIntradayInterval] = useState<SingleOption>(INTRADAY_INTERVALS[5])
  const [endDate, setEndDate] = useState('')
  const [bucketSize, setBucketSize] = useState(3)
  const [graphComponentType, setGraphComponentType] = useState<SingleOption>(GRAPH_COMPONENT_TYPE.d3)
  const [graphType, setGraphType] = useState<SingleOption>(GRAPH_TYPE.Candlesticks)
  const [type, setType] = useState(STOCK_DATA_INTERVAL_TYPES.Daily)
  const [showAverage, setShowAverage] = useState(false)
  const toggleAverage = () => {
    setShowAverage(!showAverage)
  }
  const { id } = useParams()

  useEffect(() => {
    console.log(intradayInterval.value)
    getStockInfo(type.value, id, intradayInterval.value)
  }, [type, intradayInterval])

  let data: StockValue[] = []
  stockInfo.values.forEach((item) => {
    let sDate = new Date(startDate)
    let nDate = new Date(endDate)
    if (!startDate && !endDate) {
      data.push(item)
    } else {
      if (startDate && !endDate) {
        if (sDate < item.date) {
          data.push(item)
        }
      }
      if (endDate && !startDate) {
        if (nDate > item.date) {
          data.push(item)
        }
      }
      if (startDate && endDate) {
        if (nDate > item.date && sDate < item.date) {
          data.push(item)
        }
      }
    }
  })
  if (stockInfoError) {
    return <ErrorDialog description={stockInfoError} onClick={() => {
      getStockInfo(type.value, id, intradayInterval.value)
    }} buttonText='Retry' />
  }
  const average = getMedianInBuckets(data, bucketSize, 'open')
  return (
    <Wrapper>
      <TopSide>
        <GoBack onClick={() => history.goBack()} src={arrowLeft} />
        <Symbol>{stockInfo.meta.symbol}</Symbol>
        <Details>
          <DetailsItem>
            <Icon src={location} />
            <div>{stockInfo.meta.timezone}</div>
          </DetailsItem>
          <div style={{ height: 5 }} />
          <DetailsItem>
            <Icon src={timezone} />
            <div>{stockInfo.meta.lastRefreshed}</div>
          </DetailsItem>

        </Details>


      </TopSide>
      <BottomSide>
        <SinglePageFilters
          type={type}
          setType={setType}
          graphComponentType={graphComponentType}
          setGraphComponentType={setGraphComponentType}
          bucketSize={bucketSize}
          setBucketSize={setBucketSize}
          endDate={endDate}
          setEndDate={setEndDate}
          data={data}
          startDate={startDate}
          setStartDate={setStartDate}
          showAverage={showAverage}
          toggleAverage={toggleAverage}
          graphType={graphType}
          setGraphType={setGraphType}
          intradayInterval={intradayInterval}
          setIntradayInterval={setIntradayInterval}
        />
        <div style={{ overflowX: 'scroll', maxWidth: '100%', width: '100%', minHeight: 200 }}>
          {
            stockInfoLoading ? <Loader /> :
              <>
                {
                  graphComponentType.value === 'd3' ? <D3Stock data={data} showAverage={showAverage} averageData={average} averageValueLabel={'open'} graphType={graphType.value} />
                    :
                    <Plotly data={data} showAverage={showAverage} averageData={average} averageValueLabel={'open'} />}
              </>
          }
        </div>


      </BottomSide>
    </Wrapper>
  )
}
const mapState = (state: RootState) => ({
  stockInfo: state.stocks.stockInfo,
  stockInfoError: state.stocks.stockInfoError,
  stockInfoLoading: state.stocks.stockInfoLoading
})

const mapDispatch = {
  getStockInfo
}

const connector = connect(mapState, mapDispatch)
export default connector(SingleStockPage)