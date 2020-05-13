import React from 'react'
import logo from '../assets/images/logo.svg'
import styled from 'styled-components'
import fonts from '../constants/fonts'
import fontSizes from '../constants/fontSizes'
const Text = styled.div`
    font-family:${fonts.primary};
    font-size:${fontSizes.large}px;
    font-weight:bold;
`

const Wrapper = styled.div`
    display:flex;
    align-items:center;
`
const LogoWrapper = styled.img`
    height:60px;
    width:30px;
    margin-left:5px;
`
export default function Logo () {
  return (
    <Wrapper>
      <Text>
        stock finder
      </Text>
      <LogoWrapper src={logo} />
    </Wrapper>
  )
}
