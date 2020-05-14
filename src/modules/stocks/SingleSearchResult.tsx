import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { SearchStock } from './types/SearchStock'
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
interface Props {
    item: SearchStock;
    path: string
}

const Wrapper = styled(Link)`
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
const LeftSide = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    flex:1;

`
const Symbol = styled.div`
    font-size:30px;
    font-weight:bold;
`
const Name = styled.div`
    font-size:18px;
    margin-top:12px;
`
const RightSide = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    flex:1;
    @media only screen and (max-width: 950px) {
        display:none;
    }
`
const SingleSearchResult: React.FunctionComponent<Props> = (props) =>  {
    const {item, path} = props
    return (
        <Wrapper to={path}>
            <LeftSide>
            <Symbol>
                {item.symbol}
            </Symbol>
            <Name>
                {item.name}
            </Name>
            </LeftSide>
            <RightSide>
                <div>

            <div>
                {item.location}
            </div>
            <div style={{height:12}} />
            <div>
                {item.currency}
            </div>
            </div>

            </RightSide>
           
           
        </Wrapper>
    )
}
export default SingleSearchResult