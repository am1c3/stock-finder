import React from 'react'
import LightBox from '../../components/LightBox'
import SingleSearchResult from './SingleSearchResult'
import styled from 'styled-components'
import { SearchStock } from './types/SearchStock'
import { STOCKS_PAGE_ROUTE } from '../../router/routes'
import Loader from '../../components/Loader'
import fonts from '../../constants/fonts'
interface Props {
  results: SearchStock[];
  loading:boolean;
}
const NoResults = styled.div`
  text-align:center;
  font-family:${fonts.primary};
  font-size:30px;
  margin-top:100px;
`
const StockSearchResults: React.FunctionComponent<Props> = ({ results, loading }) => {
  return (
    <LightBox title={results.length === 0 ? '' : 'Markets'}>
      {loading && <Loader />}
      {!loading && results.map((item, index) => (
        <SingleSearchResult
          path={`${STOCKS_PAGE_ROUTE}/${item.symbol}`}
          key={index}
          item={item}
        />
      ))}
      {results.length === 0 && !loading &&
      <NoResults>
        Type any symbol to search a stock
      </NoResults>
      }
    </LightBox>
  )
}

export default StockSearchResults