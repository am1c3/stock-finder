import React from 'react'
import styled from 'styled-components'
import bigCube from '../../assets/images/big_cube.svg'
import fonts from '../../constants/fonts'
import { STOCKS_PAGE_ROUTE } from '../../router/routes'
import PrimaryButton from '../../components/buttons/PrimaryButton'
const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const BigParagraph = styled.p`
    font-size:35px;
    font-family:${fonts.primary};
    font-weight:bold;
    margin:0;
    margin-top:60px;
    text-align:center;
`
const SmallParagraph = styled.p`
    font-size:24px;
    font-family:${fonts.primary};
    margin:0;
    margin-top:20px;
    text-align:center;
    margin-bottom:40px;
    transition: background-color .3s ease;
   
`
export default function HomePage () {
  return (
    <Wrapper>
      <img alt='big cube' src={bigCube} style={{ width: 300, height: 300, marginLeft: 120 }} />
      <BigParagraph>
      All essential data gathered in one place
      </BigParagraph>
      <SmallParagraph>
      Look for the stock you want.
      </SmallParagraph>
      <PrimaryButton text='Find stocks' withLink to={STOCKS_PAGE_ROUTE} />
    </Wrapper>
  )
}
