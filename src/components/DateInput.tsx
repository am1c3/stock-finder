import React from 'react'
import styled from 'styled-components'
import fonts from '../constants/fonts'
import colors from '../constants/colors'

const DateWrapper = styled.input`
    -webkit-appearance: none;
    height: 36px;
    width: 100%;
    border: 1px solid  ${colors.border};
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
    color:${colors.text};
    font-family: ${fonts.primary};
    background-color:white;
`
interface Props {
    value: string;
    onChange: ((value: string) => void);
    max?:string;
    min?:string;
  }
  const DateInput: React.FunctionComponent<Props> = (props) => {
    const {value, onChange, min,max} = props
      return (
          <DateWrapper min={min} max={max} type="date" onChange={(e) => onChange(e.target.value)} value={value} />
      )
  }
  export default DateInput