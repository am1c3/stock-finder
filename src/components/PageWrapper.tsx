import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.section`
    padding: 20px 0;
    flex:1;
    display:flex;
    flex-direction:column;
    max-width:900px;
    width:100%;
`
export default function PageWrapper ({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}
