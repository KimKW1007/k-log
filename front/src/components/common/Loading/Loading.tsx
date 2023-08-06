import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { AllCenterFlex } from '../CommonFlex';

const Loading = ({ isCustom }: { isCustom?: boolean }) => {
  return (
    <LodingBox isCustom={isCustom}>
      <LoadingInnerBox>
        <span></span>
        <span></span>
        <span></span>
      </LoadingInnerBox>
    </LodingBox>
  );
};

export default Loading;

const ani = keyframes`
  50%{
    transform: scaleY(1.1);
    background: #ff6d60;
  }
`;

const LoadingInnerBox = styled(AllCenterFlex)`
  width: 100%;
  height: 100%;
  margin: auto;
  span {
    display: block;
    width: 8px;
    height: 50%;
    transform: scaleY(1);
    background: ${({ theme }) => theme.color.err}8a;
    margin: 0 2px;
    border-radius: 2px;
  }
  span:nth-child(1) {
    animation: ${ani} 0.9s infinite;
  }
  span:nth-child(2) {
    animation: ${ani} 0.9s 0.3s infinite;
  }
  span:nth-child(3) {
    animation: ${ani} 0.9s 0.6s infinite;
  }
`;

const LodingBox = styled(AllCenterFlex)<{ isCustom?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 15px;
  ${({ isCustom }) =>
    isCustom
      ? css`
        width: 80px;
        height: 70px;
        margin : 0 auto;
        padding: 0 ;
      `
      : css`
          border: 2px solid rgb(221, 221, 221);
          border-radius: 30px;
        `}
`;
