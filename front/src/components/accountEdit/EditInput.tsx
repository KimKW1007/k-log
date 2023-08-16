import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface EditInputProps {
  title?: string;
  defaultValue?: string;
  type?: string;
  register: UseFormRegisterReturn<string>;
  isError: boolean;
  disabled?: boolean;
  isPassword?: boolean;
}

const EditInput = ({ title, defaultValue, type = 'text', register, isError, disabled, isPassword = false }: EditInputProps) => {
  return (
    <EditInputInnerBox>
      {title && (
        <EditInputTitleBox isPassword={isPassword}>
          <h4>{title}</h4>
        </EditInputTitleBox>
      )}
      <Input defaultValue={defaultValue} type={type} {...register} isError={isError} disabled={disabled} autoComplete="off" />
    </EditInputInnerBox>
  );
};

export default EditInput;

export const EditInputInnerBox = styled(OnlyAlignCenterFlex)`
  column-gap: 20px;
  @media (max-width: 660px) {
    display: block;
  }
`;

const EditInputTitleBox = styled.div<{ isPassword?: boolean }>`
  width: 80px;
  ${({ isPassword }) =>
    isPassword &&
    `
  width: 120px;
  `}
  h4 {
    font-size: 18px;
  }
  @media (max-width: 660px) {
    margin-bottom: 12px;
    h4 {
      font-size: 16px;
    }
  }
`;

const Input = styled.input<{ isError?: boolean }>`
  border: 2px solid #a5a5a5;
  width: 280px;
  line-height: 26px;
  padding: 10px;
  font-size: 16px;
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
