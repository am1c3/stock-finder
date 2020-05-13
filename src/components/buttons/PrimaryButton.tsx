import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
interface Props {
    text:string;
    withLink?: boolean;
    to?:string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const WrapperWithLink = styled(Link)`
    text-decoration:none;
`
const ButtonWrapper = styled.div`
    border-radius:5px;
    padding:15px 100px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    background-color:${colors.primary};
    font-family:${fonts.primary};
    font-size:20px;
    cursor:pointer;
    &:hover {
        background-color:${colors.primaryDarker};
    }
`
const PrimaryButton: React.FunctionComponent<Props> = (props) =>  {
    if(props.withLink) {
        return <WrapperWithLink to={props.to}>
            <ButtonWrapper>{props.text}</ButtonWrapper>
        </WrapperWithLink>
    } else {
        return (
            <ButtonWrapper onClick={props.onClick}>
                {props.text}
            </ButtonWrapper>
        )
    }
   
}
export default PrimaryButton