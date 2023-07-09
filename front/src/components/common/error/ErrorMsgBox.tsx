import React from 'react'
import styled, { css } from 'styled-components';
import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import { OnlyAlignCenterFlex } from '../CommonFlex';

interface ErrorProps {
  errColor?: boolean;
  errors?: string;
  isSettingPage ?: boolean;
}

const ErrorMsgBox = ({errColor, errors, isSettingPage}:ErrorProps) => {
  return (
    <ErrMsgBox errColor={errColor} isSettingPage={isSettingPage}>
      {errColor ? <ExclamationDiamondFill /> : <ExclamationCircleFill />}
      <ErrMsg>{errors}</ErrMsg>
    </ErrMsgBox>
  )
}

export default ErrorMsgBox

export const ErrMsgBox = styled(OnlyAlignCenterFlex)<{ errColor?: boolean; isSettingPage ?: boolean }>`
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

  ${({isSettingPage}) => isSettingPage && `
    margin: 6px 0 ;
  `}
`;
export const ErrMsg = styled.div``;