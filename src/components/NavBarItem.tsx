import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import fontSizes from '../constants/fontSizes'
const Wrapper = styled(Link)`
    color: rgba(0,0,0,0.6);
    font-family:${fonts.primary};
    text-decoration:none;
    font-size: ${fontSizes.large}px;
    margin-left:50px;
    ${({active}) => active && `
        color:rgba(0,0,0,1);
    `}
    @media only screen and (max-width: 500px) {
        margin-left:12px;
    }
`
interface Props {
    route: {
        name: string,
        to:string
    };
}
export const NavBarItem : React.FunctionComponent<Props> = ({route}) =>  {
    let location = useLocation();
    return (
        <Wrapper to={route.to} active={location.pathname === route.to}>
            {route.name}
        </Wrapper>
    )
}
