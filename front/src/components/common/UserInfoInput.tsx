import React, { useState } from 'react';
import { FieldValues, UseFormRegisterReturn, UseFormWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { ExclamationDiamondFill, ExclamationCircleFill} from "@styled-icons/bootstrap"
import { OnlyAlignCenterFlex } from './CommonFlex';
interface InputProps {
  type: string;
  inputName: string;
  register: UseFormRegisterReturn;
  watch?: UseFormWatch<FieldValues> | string;
  bold?: boolean;
  small?: boolean;
  errColor?: boolean;
  errors?: string;
}

const UserInfoInput = ({ type, inputName, watch, register, bold, small, errColor, errors }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <React.Fragment>
      <InputBox errColor={errColor}>
        <CurrentInputName className={isFocus ? 'high' : ''} small={small ?? false}>
          {inputName}
        </CurrentInputName>
        <Input
          small={small ?? false}
          bold={bold ?? false}
          type={type}
          {...register}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            !watch && setIsFocus(false);
          }}
        />
      </InputBox>
      {errors && (
        <ErrMsgBox errColor={errColor}>
          {errColor ? <ExclamationDiamondFill/> : <ExclamationCircleFill/>}
          <ErrMsg>{errors}</ErrMsg>
        </ErrMsgBox>
      )}
    </React.Fragment>
  );
};

export default UserInfoInput;

const InputBox = styled.div<{ errColor?: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 5px;
  border: 2px solid transparent;
  overflow: hidden;
  background: rgba(188, 188, 188, 0.1);
  transition: background 0.3s, border 0.3s;
  & + & {
    margin-top: ${({ theme }) => theme.rem.p20};
  }
  &:focus-within {
    background: rgba(255, 255, 255, 1);
    border: 2px solid #555;
  }
  ${({ errColor }) =>
    errColor &&
    css`
      background: rgba(255, 109, 96, 0.1);
      border: 2px solid rgba(255, 109, 96, 0.1);
      &:focus-within {
        border: 2px solid rgba(255, 109, 96, 0.5);
      }
      span {
        color: #FF6D60;
        &.high{
          color: #FF6D60;
        }
      }
    `}
`;

const Input = styled.input<{ bold: boolean; small: boolean }>`
  position: relative;
  z-index: 2;
  width: 100%;
  line-height: ${({ theme }) => theme.rem.p40};
  padding: ${({ theme }) => theme.rem.p28} ${({ theme }) => theme.rem.p12} ${({ theme }) => theme.rem.p10};
  font-size: ${({ theme }) => theme.rem.p20};
  background: rgba(0, 0, 0, 0);
  border-radius: 5px;
  outline: none;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ small, theme }) =>
    small &&
    css`
      line-height: ${theme.rem.p28};
      padding: ${theme.rem.p22} ${theme.rem.p12} ${theme.rem.p10};
      font-size: ${theme.rem.p16};
    `}
`;

const CurrentInputName = styled.span<{ small: boolean }>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 6%;
  transform: translateY(-50%);
  letter-spacing: 1px;
  transition: 0.3s;
  font-weight: bold;
  color: #acacac;
  ${({ small }) =>
    small &&
    css`
      font-size: 14px;
    `}
  &.high {
    z-index: 3;
    top: 25%;
    left: 3%;
    font-size: 13px;
    pointer-events: none;
    color: #232323;
    ${({ small }) =>
      small &&
      css`
        font-size: 12px;
      `}
  }
`;

const ErrMsgBox = styled(OnlyAlignCenterFlex)<{ errColor?: boolean }>`
  margin: 6px 0 30px;
  svg{
    width: 1em;
    margin-right: 6px;
    color: #00C4FF;
  }
  ${({ errColor }) =>
    errColor &&
    css`
      color: #FF6D60;
      svg{
        color: inherit;
      }
    `}
`;
const ErrMsg = styled.div`

`;
