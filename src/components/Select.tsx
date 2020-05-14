import React from 'react'
import styled from 'styled-components'
import fonts from '../constants/fonts'
import Select from 'react-select'
import colors from '../constants/colors';
interface Props {
  value:string;
  onChange: ((value:string) => void );
}
const styles = {
  option: (styles, state) =>  ({
      ...styles,
      backgroundColor: state.isSelected ? colors.primary : null,
      color: state.isSelected? 'white' : 'black'
    })
};
const SelectWrapper = styled.div`
    .react-select-container {
      min-width:200px;
    }
    @media only screen and (max-width: 500px) {
      width:100%;
    }
`
const Option = styled.option`
    height:40px;
`
export default function CustomSelect (props) {
  const { options, value, onChange } = props
  return (
    <SelectWrapper>
      <Select 
      className='react-select-container'
      classNamePrefix="react-select"
        value={value}
        options={options}
        onChange={onChange}
        styles={styles}
      />
    </SelectWrapper>

  )
}
