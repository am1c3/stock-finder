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
  margin-right:12px;
  min-width:200px;
  margin-bottom:12px;
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

const SingleSearchWrapper = styled(Link)`
    background-color:${colors.primaryLight};
    border-radius:25px;
    text-decoration:none;
    color:black;
    padding:24px 48px;
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
    font-family:${fonts.primary};
    cursor:pointer;
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
export {
  GoBack,
  Filter,
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
