import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.section`
    padding: 20px 5%;
    flex:1;
    flex-direction:column;
`
export default function PageWrapper ({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}
