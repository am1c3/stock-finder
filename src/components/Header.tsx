import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'
import Logo from './Logo'
const HeaderWrapper = styled.header`
    display:flex;
    width:100%;
    justify-content:space-between;
    align-items:center;
    padding: 20px 0;
    max-width:900px
`
export default function Header () {
  return (
    <HeaderWrapper>
      <Logo />
      <NavBar />
    </HeaderWrapper>
  )
}
