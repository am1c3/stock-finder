import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Plot from 'react-plotly.js'
import { connect } from 'react-redux'
import { RootState } from '../../../store/types'
import { getStockInfo } from '../StocksActions'
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import timezone from '../../../assets/icons/time.svg'
import location from '../../../assets/icons/location.svg'
import money from '../../../assets/icons/money.svg'
import Select from '../../../components/Select'
import Loader from '../../../components/Loader'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import ErrorDialog from '../../../components/ErrorDialog'
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
`
const FilterValue = styled.div`
`
const FilterLabel = styled.label`
  color:rgba(0,0,0,0.8);
  margin-bottom:12px;

`
const Filter = styled.div`
  display:flex;
  flex-direction:column;
  margin-right:12px;
`
function SingleStockPage(props) {
  const [type, setType] = useState('TIME_SERIES_DAILY')
  const { id } = useParams()
  useEffect(() => {
    props.getStockInfo(type, id)
  }, [type])
  const { stockInfo, stockInfoError, stockInfoLoading } = props
  if (stockInfoLoading) {
    return <Loader />
  }
  if (stockInfoError) {
    return <ErrorDialog description={stockInfoError} onClick={() => {
      props.getStockInfo(type, id)
    }} buttonText='Retry' />
  }
  return (
    <Wrapper>
      <TopSide>
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
              <Select options={[{
                label: 'dada',
                value: 'dada'
              }
              ]} />
            </FilterValue>
          </Filter>
          <Filter>
            <FilterLabel>Graph type</FilterLabel>
            <FilterValue>
              <Select options={[
                {
                  label: 'Plotify',
                  value: 'plotify'
                },
                {
                  label: 'Custom',
                  value: 'custom'
                }
              ]} />
            </FilterValue>
          </Filter>


        </Filters>
        <Plot
          data={[
            {
              x: stockInfo.values.map(item => item.date),
              y: stockInfo.values.map(item => item.open),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 854, height: 440 }}
        />
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