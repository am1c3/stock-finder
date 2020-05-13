import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
const Wrapper = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  ${({color, size}) => `
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    margin: ${size/8}px;
    border: ${size/8}px solid ${color};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${color} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  `}
`
interface Props {
  color?:string;
  size?:number;
}
export default function Loader<Props> (props) {
  return (
    <Wrapper color={props.color || colors.primary} size={props.size || 60}>
      <div className='lds-ring'><div /><div /><div /><div /></div>
    </Wrapper>
  )
}
