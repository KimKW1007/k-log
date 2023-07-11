import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { vaildaters } from '@utils/userInfoEdit';
import React from 'react'
import { FieldValues, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import styled, { css } from 'styled-components';

interface EditInputProps{
  title : string;
  name : string;
  defaultValue ?: string;
  type ?: string;
  register: UseFormRegisterReturn<string>
  isError : boolean;
  disabled ?: boolean;
  isPassword ?:boolean;
}

const EditInput = ({title, name, defaultValue, type = 'text', register, isError, disabled, isPassword = false} : EditInputProps) => {
  return (
    <EditInputBox>
      <EditInputInnerBox>
        <EditInputTitleBox isPassword={isPassword}>
          <h4>{title}</h4>
        </EditInputTitleBox>
        <Input
          defaultValue={defaultValue}
          type={type}
          {...register}
          isError={isError}
          disabled={disabled}
        />
      </EditInputInnerBox>
      {isPassword || <SubmitBtnBox>
        <SubmitBtn>{name === 'userName' ? '개명' : '변경'}</SubmitBtn>
      </SubmitBtnBox>}
    </EditInputBox>
  )
}

export default EditInput

const EditInputBox = styled(OnlyAlignCenterFlex)`
  column-gap: 10px;
`;
const EditInputInnerBox = styled(OnlyAlignCenterFlex)`
  column-gap: 20px;
`;

const EditInputTitleBox = styled.div<{isPassword ?: boolean;}>`
  width: 80px;
  ${({isPassword})=>isPassword && `
  width: 120px;
  `}
  h4 {
    font-size: 18px;
  }
`;

const Input = styled.input<{ isError?: boolean }>`
  border: 2px solid #a5a5a5;
  width: 280px;
  line-height: ${({ theme }) => theme.rem.p26};
  padding: ${({ theme }) => theme.rem.p10} ${({ theme }) => theme.rem.p10};
  font-size: ${({ theme }) => theme.rem.p16};
  background: #f0f0f0;
  border-radius: 5px;
  transition: 0.2s;
  outline: none;
  font-weight: 600;
  &:focus {
    border: 2px solid #000;
    background: #fff;
  }
  ${({ isError, theme }) =>
    isError &&
    `
  background: ${theme.color.err}1a;
  border: 2px solid ${theme.color.err}1a;
  &:focus {
    border: 2px solid ${theme.color.err}cc;
  }
  `}
  &:disabled {
    color: #454545;
    background: #898989;
    pointer-events: none;
  }
`;

const SubmitBtnBox = styled.div``;
const SubmitBtn = styled.button`
  padding: 8px 16px 8px;
  border: 1px solid #cfcfcf;
  background: linear-gradient(#fff 10%, #ddd);
  font-size: 15px;
  font-weight: 900;
  letter-spacing: -1.4px;
`;
