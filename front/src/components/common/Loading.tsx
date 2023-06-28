import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AllCenterFlex } from './CommonFlex';

const Loading = () => {
  return (
    <LodingBox>
      <span></span>
      <span></span>
      <span></span>
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

const LodingBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: ${({ theme }) => theme.rem.p10};
  margin: 0 auto;
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
