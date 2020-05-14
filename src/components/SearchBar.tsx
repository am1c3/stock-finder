import React from 'react'
import styled from 'styled-components'
import search from '../assets/icons/search.svg'
import clear from '../assets/icons/clear.svg'
import colors from '../constants/colors'
const InputWrapper = styled.div`
    position:relative;
    width:100%;
`
const Input = styled.input`
    border-radius:40px;
    padding:0px 48px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:${colors.primary};
    outline:none;
    border:none;
    height:70px;
    width:100%;
    color:white;
    font-size:24px;
    &::placeholder {
        color:rgba(255,255,255,0.6);
    }
    @media only screen and (max-width: 950px) {
        padding: 0px 24px;
    }
    
`
const SearchIcon = styled.img`
    width:30px;
    height:30px;
    position:absolute;
    right:48px;
    bottom:calc(50% - 15px);
    @media only screen and (max-width: 500px) {
        right:24px;
    }
    ${({withClear}) => withClear && 'cursor:pointer;'}
`
interface Props {
    value: string;
    onChange: ((value: string) => void);
    onClear?: (() => void);
    withClear?: boolean;
    placeholder:string;
}
const SearchBar: React.FunctionComponent<Props> = (props) => {
    const { onChange, value, placeholder, onClear,withClear } = props
    const clearInput = () => {
        if(withClear && onClear) {
            onClear()
            onChange('')
        }
    }
    return (
        <InputWrapper>
            <Input onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder}/>
            <SearchIcon src={value !== '' && withClear? clear: search} onClick={clearInput} withClear={withClear}/>
        </InputWrapper>
    )
}
export default SearchBar