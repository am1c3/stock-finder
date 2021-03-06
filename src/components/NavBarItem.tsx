import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled from 'styled-components'
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
    let active = location.pathname.includes(route.to)
    if(route.to === '/' && location.pathname !== route.to) {
        active = false
    }
    return (
        <Wrapper to={route.to} active={active}>
            {route.name}
        </Wrapper>
    )
}
