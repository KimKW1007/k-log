import React, { useState } from 'react';
import { FieldValues, UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';

interface InputProps {
  type: string;
  inputName: string;
  register: UseFormRegisterReturn;
  watch ?: UseFormWatch<FieldValues> | string;
  bold ?: boolean;
  small ?: boolean;
}

const UserInfoInput = ({ type, inputName, watch, register, bold, small }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <InputBox>
      <CurrentInputName className={isFocus ? "high" : ""} small={small ?? false}>{inputName}</CurrentInputName>
      <Input small={small ?? false} bold={bold ?? false} type={type} {...register}  onFocus={()=>{setIsFocus(true)}} onBlur={()=>{!watch && setIsFocus(false)}} />
    </InputBox>
  );
};

export default UserInfoInput;

const InputBox = styled.div`
  position:relative;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #000;
  overflow:hidden;
  background:rgba(188,188,188,.1);
  transition:background .3s;
  &:focus-within{
    background:rgba(255,255,255,1);
  }
`;

const Input = styled.input<{bold : boolean, small: boolean}>`
  position:relative;
  z-index:2;
  width: 100%;
  line-height: ${({theme})=>theme.rem.p40};
  padding : ${({theme})=>theme.rem.p28} ${({theme})=>theme.rem.p12} ${({theme})=>theme.rem.p10};
  font-size: ${({theme})=>theme.rem.p20};
  background:rgba(0,0,0,0);
  border-radius: 5px;
  ${({bold}) => bold && css`
    font-weight:bold;
  `}
  ${({small, theme}) => small && css`
    line-height: ${theme.rem.p28};
    padding : ${theme.rem.p22} ${theme.rem.p12} ${theme.rem.p10};
    font-size: ${theme.rem.p16};
  `}

`;

const CurrentInputName = styled.span<{ small: boolean}>`
  position:absolute;
  z-index:1;
  top: 50%;
  left: 6%;
  transform: translateY(-50%);
  letter-spacing:1px;
  transition: .3s;
  font-weight: bold;
  ${({small, theme}) => small && css`
  font-size : 14px;
`}
  &.high{
    z-index:3;
    top: 25%;
    left: 3%;
    font-size : 13px;
    pointer-events: none;
    ${({small, theme}) => small && css`
      font-size : 12px;
    `}
  }
`;
