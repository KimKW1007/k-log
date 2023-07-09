import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import { OnlyAlignCenterFlex } from './CommonFlex';
import { UserInfoInputProps } from '@src/types/user';
import ErrorMsgBox from './error/ErrorMsgBox';

const UserInfoInput = ({ type, inputName, watch, register, bold = false, small = false, errColor, errors }: UserInfoInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    watch ? setIsFocus(true) : setIsFocus(false);
  }, [watch]);
  return (
    <React.Fragment>
      <InputBox errColor={errColor}>
        <CurrentInputName className={isFocus ? 'high' : ''} small={small}>
          {inputName}
        </CurrentInputName>
        <Input
          small={small}
          bold={bold}
          type={type}
          {...register}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            !watch && setIsFocus(false);
          }}
          autoComplete="off"
        />
      </InputBox>
      {errors && (<ErrorMsgBox errColor={errColor} errors={errors}/> )}
    </React.Fragment>
  );
};

export default UserInfoInput;

export const InputBox = styled.div<{ errColor?: boolean }>`
  position: relative;
  z-index: 2;
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
  ${({ errColor, theme }) =>
    errColor &&
    css`
      background: ${theme.color.err}1a;
      border: 2px solid ${theme.color.err}1a;
      &:focus-within {
        border: 2px solid ${theme.color.err}cc;
      }
      span {
        color: ${theme.color.err};
        &.high {
          color: ${theme.color.err};
        }
      }
    `}
`;

export const Input = styled.input<{ bold?: boolean; small?: boolean; isEmail?: boolean }>`
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
      line-height: ${theme.rem.p26};
      padding: ${theme.rem.p28} ${theme.rem.p12} 0.5rem;
      font-size: ${theme.rem.p16};
    `}
  ${({ isEmail, theme }) =>
    isEmail &&
    css`
      padding: ${theme.rem.p28} ${theme.rem.p100} ${theme.rem.p10} ${theme.rem.p12};
    `}
`;

export const CurrentInputName = styled.span<{ small: boolean }>`
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

export const ErrMsgBox = styled(OnlyAlignCenterFlex)<{ errColor?: boolean }>`
  margin: 6px 0 30px;
  svg {
    width: 1em;
    margin-right: 6px;
    color: #00c4ff;
  }
  ${({ errColor, theme }) =>
    errColor &&
    css`
      color: ${theme.color.err};
      svg {
        color: inherit;
      }
    `}
`;
export const ErrMsg = styled.div``;

export const CertificateBtn = styled.button`
  width: 100%;
  height: 100%;
  font-size: 12px;
  background: #787878;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background: #454545;
  }
`;

export const CertificateBtnBox = styled.div`
  position: absolute;
  z-index: 4;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem.p90};
  height: ${({ theme }) => theme.rem.p40};
  border-radius: 8px;
  overflow: hidden;
`;
