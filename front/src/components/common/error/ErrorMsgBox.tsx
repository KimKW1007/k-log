import React from 'react'
import styled, { css } from 'styled-components';
import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import { OnlyAlignCenterFlex } from '../CommonFlex';

interface ErrorProps {
  errColor?: boolean;
  errors?: string;
}

const ErrorMsgBox = ({errColor, errors}:ErrorProps) => {
  return (
    <ErrMsgBox errColor={errColor}>
      {errColor ? <ExclamationDiamondFill /> : <ExclamationCircleFill />}
      <ErrMsg>{errors}</ErrMsg>
    </ErrMsgBox>
  )
}

export default ErrorMsgBox

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