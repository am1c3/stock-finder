import React from 'react'
import { SearchStock } from './types/SearchStock'
import { SingleSearchWrapper, SingleSearchLeftSide, Symbol, SingleSearchName, SingleSearchRightSide } from './styles'
interface Props {
    item: SearchStock;
    path: string
}


const SingleSearchResult: React.FunctionComponent<Props> = (props) =>  {
    const {item, path} = props
    return (
        <SingleSearchWrapper to={path}>
            <SingleSearchLeftSide>
            <Symbol>
                {item.symbol}
            </Symbol>
            <SingleSearchName>
                {item.name}
            </SingleSearchName>
            </SingleSearchLeftSide>
            <SingleSearchRightSide>
                <div>

            <div>
                {item.location}
            </div>
            <div style={{height:12}} />
            <div>
                {item.currency}
            </div>
            </div>

            </SingleSearchRightSide>
           
           
        </SingleSearchWrapper>
    )
}
export default SingleSearchResult