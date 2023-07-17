import React from 'react';
import styled, { css } from 'styled-components';
import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import { OnlyAlignCenterFlex } from '../CommonFlex';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface ErrorProps {
  errColor?: boolean;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isEditPage?: boolean;
}

const ErrorMsgBox = ({ errColor, errors, isEditPage }: ErrorProps) => {
  return (
    <ErrMsgBox errColor={errColor} isEditPage={isEditPage}>
      {errColor ? <ExclamationDiamondFill /> : <ExclamationCircleFill />}
      <ErrMsg>{`${errors}`}</ErrMsg>
    </ErrMsgBox>
  );
};

export default ErrorMsgBox;

export const ErrMsgBox = styled(OnlyAlignCenterFlex)<{ errColor?: boolean; isEditPage?: boolean }>`
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

  ${({ isEditPage }) =>
    isEditPage &&
    `
    margin: 6px 0 ;
  `}
 
`;
export const ErrMsg = styled.div`

@media(max-width: 660px){
  font-size: 14px;
}
`;
