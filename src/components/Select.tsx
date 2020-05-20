import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import colors from '../constants/colors';
export interface SingleOption {
  value:string;
  label:string;
}
interface Props {
  value:SingleOption;
  onChange: ((value:SingleOption) => void );
  options: SingleOption[]
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

const CustomSelect: React.FunctionComponent<Props> = (props) => {
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
export default CustomSelect