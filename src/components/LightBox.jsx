import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
const Wrapper = styled.div`
    padding:24px 0px;
    border-radius:5px;
    flex:1;
  
`

const Title = styled.div`
  font-family:${fonts.primary};
  margin-bottom:24px;
  margin-left:48px;
  font-weight:bold;
  color:rgba(0,0,0,0.6);
  @media only screen and (max-width: 950px) {
   margin-left:24px;
}
`

const LightBox = ({ children, title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  )
}
export default LightBox
