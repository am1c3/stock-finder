import React from 'react'
import styled from 'styled-components'
import error from '../assets/icons/error.svg'
import PrimaryButton from './buttons/PrimaryButton'
import fonts from '../constants/fonts'
interface Props {
    description: string;
    buttonText: string;
    onClick: (() => void);
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Description = styled.div`
    padding:40px 60px;
    text-align:center;
    font-family:${fonts.primary};
    font-size:16px;
    line-height:30px;
`
const Icon = styled.img`
    width:200px;
    height:200px;
`
const ErrorDialog: React.FunctionComponent<Props> = (props) => {
    const { description, buttonText, onClick } = props
    return (
        <Wrapper>
            <Icon src={error} />
            <Description>{description}</Description>
            <PrimaryButton onClick={onClick} text={buttonText} />
        </Wrapper>
    )
}
export default ErrorDialog