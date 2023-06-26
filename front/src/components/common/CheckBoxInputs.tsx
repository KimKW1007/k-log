import React from 'react'
import styled from 'styled-components';
import { OnlyAlignCenterFlex } from './CommonFlex';
import { ChildrenProps } from '@components/layout/Layout';
import checkedIcon from "@images/check.svg"
interface CheckBoxProps extends ChildrenProps{
  id : string;
  onClick : any;
}

const CheckBoxInputs = ({children, id, onClick} : CheckBoxProps) => {
  return (
    <InputBox>
      <CheckBoxInput className='blind' type='checkbox' id={id} onClick={onClick}/>
      <Label htmlFor={id}>
        {children}
      </Label>
    </InputBox>
  )
}

export default CheckBoxInputs

const InputBox = styled.div`
  width:100%;

`

const CheckBoxInput = styled.input`

  &:checked + label{
    &::before{
      background : url(${checkedIcon.src}) center center no-repeat;
      background-color : #000;
      
    }
  }

`

const Label = styled.label`
  position: relative;
  display: inline-flex;
  font-size: ${({theme})=> theme.rem.p20};
  &:before{
    position: relative;
    z-index: 1;
    content:"";
    width:1em;
    height:1em;
    border:1px solid #000;
    margin :auto 0;
    transition:background-color .3s ;
    border-radius: 4px;
    margin-right: 20px;
  }
`

