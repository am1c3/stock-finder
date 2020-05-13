import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import colors from '../constants/colors'
const Wrapper = styled(Link)`
    color:${colors.text};
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
