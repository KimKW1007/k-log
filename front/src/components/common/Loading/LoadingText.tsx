import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import Loading from './Loading';
import { AllCenterFlex } from '../CommonFlex';
import { ChildrenProps } from '@src/types/children';

const LoadingText = ({children = '로딩 중'} : {children ?: React.ReactNode}) => {
  return (
    <LoadingWrap>
      <LoadingContainer>
        <Loading isCustom/>
        <LoadingTextBox>
          {children}
        </LoadingTextBox>
      </LoadingContainer>
    </LoadingWrap>
  )
}

export default LoadingText

const LoadingWrap = styled(AllCenterFlex)`
  width:100%;
  height:100%;
`

const LoadingContainer = styled.div`
  width: 100px;
  height: 100px;
`

const LoadingTextBox = styled.div`
  text-align:center;
  color: ${({theme}) => theme.color.err};
`