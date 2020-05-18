import React from 'react';
import styled from 'styled-components'
import fonts from '../constants/fonts';
const Wrapper = styled.div`
  position:relative;
  min-width:200px;
  @media only screen and (max-width: 500px) {
    width:100%;
  }
`
const InputWrapper = styled.input`
  border: 1px solid hsl(0,0%,80%);
  border-radius:4px;
  height:36px;
  width:100%;
 
`
const Value = styled.div`
  position:absolute;
  top:-7px;
  right:2px;
  font-family: ${fonts.primary};
  color: rgb(51, 51, 51);
`
interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: ((value: number) => void)
}
const Slider: React.FunctionComponent<Props> = (props) => {
  const { value, onChange, min = 0, max = 0 } = props
  return (
    <Wrapper>
      <InputWrapper value={value}
        min={min}
        type="range"
        max={max}
        onChange={(e) => {
          onChange(+e.target.value)
        }} />
      <Value>{value}</Value>
    </Wrapper>
  );
}
export default Slider