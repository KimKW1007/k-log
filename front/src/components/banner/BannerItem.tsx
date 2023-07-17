import {banner1, banner2, banner3} from '@utils/bannerList';
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


interface BannerItemProps {
  currentRotate: number;
  delay: number;
  boxWidth?: number;
  boxHeight?: number;
  resetRotate: boolean;
}

const BaanerItem = ({ currentRotate, delay, boxWidth, boxHeight, resetRotate }: BannerItemProps) => {
  return <Item currentRotate={currentRotate} boxWidth={boxWidth} resetRotate={resetRotate}
  boxHeight={boxHeight} delay={delay}></Item>;
};

export default BaanerItem;
// ${({delay}) => delay * 32 }
// ${({ currentRotate }) => currentRotate}

const Item = styled.div<{ currentRotate: number; delay: number; boxWidth?: number; boxHeight?: number; resetRotate: boolean; }>`
  position: absolute;
  width: 40px;
  height: 100%;
  background: url(${banner1}) -${({ delay }) => delay * 40}px center no-repeat;
  background-size: ${({ boxWidth }) => boxWidth! +40}px ${({ boxHeight }) => boxHeight! + 30}px;
  transform-style: preserve-3d;
  transform: rotateY(${({ currentRotate }) => currentRotate}deg);
  left: ${({ delay }) => delay * 39}px;
  top: -8px;
  transition: transform 2s ${({ delay }) => delay * 0.15}s;
  ${({ resetRotate }) => resetRotate && `transition: none`};
  transform-origin: center center -8.666px;
  &:after {
    background: url(${banner2}) -${({ delay }) => delay * 40}px center no-repeat;
    left: 102%;
    transform: rotateY(120deg);
    transform-origin: left;
  }
  &:before {
    background: url(${banner3}) -${({ delay }) => delay * 39}px center no-repeat;
    left: -102%;
    transform: rotateY(240deg);
    transform-origin: right;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: ${({ boxWidth }) => boxWidth! +40}px ${({ boxHeight }) => boxHeight! + 30}px;
    top: 0;
    
  }

  
`;
