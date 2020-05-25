import React from 'react'
import LightBox from '../../components/LightBox'
import SingleSearchResult from './SingleSearchResult'
import { SearchStock } from './types/SearchStock'
import { STOCKS_PAGE_ROUTE } from '../../router/routes'
import Loader from '../../components/Loader'
import { StockSearchNoResultsWrapper, StockSearchNoResultsImg } from './styles'
import searchDef from '../../assets/images/search_default.svg'
interface Props {
  results: SearchStock[];
  loading:boolean;
}

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
      <StockSearchNoResultsWrapper>
        <StockSearchNoResultsImg src={searchDef}  />
      </StockSearchNoResultsWrapper>
      }
    </LightBox>
  )
}

export default StockSearchResults