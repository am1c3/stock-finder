import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import fontSizes from '../constants/fontSizes'
const Wrapper = styled(Link)`
    color:${colors.text};
    font-family:${fonts.primary};
    text-decoration:none;
    font-size: ${fontSizes.large}px;
    margin-left:50px;
`
interface Props {
    route: {
        name: string,
        to:string
    };
}
export const NavBarItem : React.FunctionComponent<Props> = ({route}) =>  {
    return (
        <Wrapper to={route.to}>
            {route.name}
        </Wrapper>
    )
}
