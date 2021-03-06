import styled from 'styled-components'
import { Link } from 'react-router-dom'
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    font-family:${fonts.primary};
    color:white;
    border-radius:25px;
    box-shadow:1px 1px 20px rgba(42,95,123,0.15);
    overflow:hidden;

`
const TopSide = styled.aside`
  display:flex;
  padding:24px 48px;
  align-items:center;
  justify-content:space-between;
  background-color:${colors.primary};
  min-height:125px;
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
  border-radius:5px;
  align-items:center;
`
const Symbol = styled.div`
  font-size:30px;
  font-weight:bold;
  letter-spacing:2px; 
  color:${colors.primary};
 

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
  flex-wrap:wrap;
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
  margin-right:24px;
  min-width:200px;
  margin-bottom:24px;
  @media only screen and (max-width: 500px) {
    margin-right:0;
    margin-top:24px;
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

const SingleSearchWrapper = styled(Link)`
    box-shadow:1px 1px 20px rgba(0,0,0,0.1);
    box-shadow: 1px 1px 20px rgba(42, 95, 123,0.15);
    text-decoration:none;
    color:black;
    border-radius:5px;
    padding:24px 48px;
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
    font-family:${fonts.primary};
    cursor:pointer;
    color:rgb(100,100,100);
    @media only screen and (max-width: 600px) {
        padding:24px 24px;
      }

`
const SingleSearchLeftSide = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    flex:1;

`
const SingleSearchName = styled.div`
    font-size:18px;
    margin-top:12px;
    color:black;
`
const SingleSearchRightSide = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    flex:1;
    @media only screen and (max-width: 950px) {
        display:none;
    }
`
const StockSearchNoResults = styled.div`
  text-align:center;
  font-family:${fonts.primary};
  font-size:30px;
  margin-top:100px;
`
const StockSearchNoResultsImg = styled.img`
    max-width:70%;
    @media only screen and (max-width: 500px) {
      max-width:100%;
    }
`
const StockSearchNoResultsWrapper = styled.div`
    flex:1;
    display:flex;
    justify-content:center;
    
`
export {
  GoBack,
  Filter,
  StockSearchNoResultsWrapper,
  StockSearchNoResultsImg,
  FilterLabel,
  Filters,
  FilterValue,
  Icon,
  Details,
  DetailsItem,
  Symbol,
  TopSide,
  BottomSide,
  Wrapper,
  SingleSearchName,
  SingleSearchWrapper,
  SingleSearchLeftSide,
  SingleSearchRightSide,
  StockSearchNoResults
}
