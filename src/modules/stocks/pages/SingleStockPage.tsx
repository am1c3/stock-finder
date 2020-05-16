import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Switch from 'react-switch'
import Plot from 'react-plotly.js'
import { connect } from 'react-redux'
import { RootState } from '../../../store/types'
import { getStockInfo } from '../StocksActions'
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import timezone from '../../../assets/icons/time.svg'
import location from '../../../assets/icons/location.svg'
import Select from '../../../components/Select'
import Loader from '../../../components/Loader'
import ErrorDialog from '../../../components/ErrorDialog'
import arrowLeft from '../../../assets/icons/arrow-left.svg'
import Plotly from '../graphs/Plotly'
import D3Stock from '../graphs/D3Stock'
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    font-family:${fonts.primary};
    color:white;
`
const TopSide = styled.aside`
  display:flex;
  padding:24px 48px;
  align-items:center;
  justify-content:space-between;
  background-color:${colors.primary};
  border-radius:25px;
  min-height:100px;
  @media only screen and (max-width: 500px) {
    justify-content:center;
    position:relative;
  }
`
const BottomSide = styled.div`
  flex:1;
  display:flex;
  padding:24px;
  flex-direction:column;
  margin-top:12px;
  background-color:${colors.primaryLight};
  border-radius:5px;
  align-items:center;
`
const Symbol = styled.div`
  font-size:30px;
  font-weight:bold;
  letter-spacing:2px;
 

`
const Details = styled.div`
  @media only screen and (max-width: 500px) {
  display:none;
  }
`
const DetailsItem = styled.div`
  display:flex;
  font-size:18px;
  align-items:center;
`
const Icon = styled.img`
  margin-right:10px;
  width:25px;
  height:25px;
`
const Filters = styled.div`
  width:100%;
  display:flex;
  margin-bottom:24px;
  @media only screen and (max-width: 500px) {
    flex-direction:column;
  }

`
const FilterValue = styled.div`
  min-height:40px;
  display:flex;
  align-items:center;
`
const FilterLabel = styled.label`
  color:rgba(0,0,0,0.8);
  margin-bottom:12px;

`
const Filter = styled.div`
  display:flex;
  flex-direction:column;
  margin-right:12px;
  @media only screen and (max-width: 500px) {
    margin-right:0;
    margin-top:12px;
  }
`
const GoBack = styled.img`
  display:none;
  width:50px;
  height:50px;
  @media only screen and (max-width: 500px) {
    display:block;
  }
  position:absolute;
  left:12px;
  top:calc(50% - 25px);
`


function SingleStockPage(props) {
  const history = useHistory()
  const [graphType, setGraphType] = useState(
    {
      label: 'Plotify',
      value: 'plotify'
    },
  )
  const [type, setType] = useState({
    label: 'Daily',
    value: 'TIME_SERIES_DAILY'
  })
  const [showAverage, setShowAverage] = useState(false)
  const toggleAverage = () => {
    setShowAverage(!showAverage)
  }
  const { id } = useParams()

  useEffect(() => {
    props.getStockInfo(type.value, id)
  }, [type])
  const { stockInfo, stockInfoError, stockInfoLoading } = props

  if (stockInfoError) {
    return <ErrorDialog description={stockInfoError} onClick={() => {
      props.getStockInfo(type.value, id)
    }} buttonText='Retry' />
  }
  const mean = stockInfo.values.reduce((acumulator, currentValue) => { return +currentValue.open + acumulator }, 0) / stockInfo.values.length
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
        <Filters>
          <Filter>
            <FilterLabel>Time frame</FilterLabel>
            <FilterValue>
              <Select
                value={type}
                onChange={(value) => setType(value)}
                options={[
                  {
                    label: 'Daily',
                    value: 'TIME_SERIES_DAILY'
                  },
                  {
                    label: 'Weekly',
                    value: 'TIME_SERIES_WEEKLY'
                  },
                  {
                    label: 'Monthly',
                    value: 'TIME_SERIES_MONTHLY'
                  }
                ]} />
            </FilterValue>
          </Filter>
          <Filter>
            <FilterLabel>Graph type</FilterLabel>
            <FilterValue>
              <Select value={graphType}
                onChange={(value) => setGraphType(value)}
                options={[
                  {
                    label: 'Plotify',
                    value: 'plotify'
                  },
                  {
                    label: 'D3',
                    value: 'd3'
                  }
                ]} />
            </FilterValue>
          </Filter>
          <Filter>
            <FilterLabel>Show average</FilterLabel>
            <FilterValue>
              <Switch checked={showAverage} onChange={toggleAverage} onColor={colors.primary} />
            </FilterValue>
          </Filter>
         


        </Filters>
        <div style={{ overflowX: 'scroll', maxWidth: '100%', width: '100%', minHeight: 200 }}>

          {
            stockInfoLoading ? <Loader /> :
              <>
                {
                  graphType.value === 'd3' ? <D3Stock stockInfo={stockInfo} showAverage={showAverage} mean={mean} />
                    :
                    <Plotly stockInfo={stockInfo} showAverage={showAverage} mean={mean} />}
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