import React from 'react'
import styled from 'styled-components'
import { NavBarItem } from './NavBarItem'
import { HOME_ROUTE, STOCKS_PAGE_ROUTE } from '../router/routes'
const Wrapper = styled.div`
  @media only screen and (max-width: 380px) {
      display:flex;
      justify-content:space-around;
      width:100%;
      margin-top:20px;
  }

`
const NavBar = () => {
  return (
    <Wrapper>
      <NavBarItem route={{ to: HOME_ROUTE, name: 'home' }} />
      <NavBarItem route={{ to: STOCKS_PAGE_ROUTE, name: 'stocks' }} />
    </Wrapper>
  )
}
export default NavBar
