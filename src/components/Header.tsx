import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'
import Logo from './Logo'
const HeaderWrapper = styled.header`
    display:flex;
    width:100%;
    justify-content:space-between;
    align-items:center;
    padding: 20px 5%;
`
export default function Header () {
  return (
    <HeaderWrapper>
      <Logo />
      <NavBar />
    </HeaderWrapper>
  )
}
