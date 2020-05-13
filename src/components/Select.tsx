import React from 'react'
import styled from 'styled-components'
import fonts from '../constants/fonts'
const SelectWrapper = styled.select`
    min-width:150px;
    height:40px;
    padding:24px;
    border:none;
    font-size:14px;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.15);
    font-family:${fonts.primary};
`
const Option = styled.option`
    height:40px;
`
export default function Select (props) {
  const { options } = props
  return (
    <SelectWrapper>
      {options.map((item, index) => (
        <Option key={index} value={item.value}>
          {item.label}
        </Option>))}
    </SelectWrapper>
  )
}
