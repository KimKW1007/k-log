import React from 'react'
import styled, { keyframes } from 'styled-components';
import { AllCenterFlex } from '../CommonFlex';

const TypingLoading = ({isMargin = false} : {isMargin ?: boolean}) => {
  return (
    <LoadingWrap isMargin={isMargin}>
      <LoadingCircleBox>
        <LoadingCircle/>
      </LoadingCircleBox>
    </LoadingWrap>
  )
}

export default TypingLoading

const load8 = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
`

const LoadingWrap = styled(AllCenterFlex)<{isMargin ?: boolean}>`
  width: 100%;
  height:100%;
  ${({isMargin})=> isMargin && `
    margin : 60px 0;
  `}
`
const LoadingCircleBox = styled.div`
  width: 60px;
  height: 60px;
`

const LoadingCircle = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-left: 2px solid #ffffff;
  animation: ${load8} 1.1s infinite linear;
`