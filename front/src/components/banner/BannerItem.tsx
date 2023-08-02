import {banner1, banner2, banner3} from '@utils/bannerList';
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


interface BannerItemProps {
  currentRotate: number;
  idx: number;
  resetRotate: boolean;
}

const BaanerItem = ({ currentRotate, idx, resetRotate }: BannerItemProps) => {
  return <Item currentRotate={currentRotate} resetRotate={resetRotate} idx={idx}></Item>;
};

export default BaanerItem;
// ${({idx}) => idx * 32 }
// ${({ currentRotate }) => currentRotate}

const Item = styled.div<{ currentRotate: number; idx: number; resetRotate: boolean; }>`
  position: absolute;
  z-index: 50;
  width: 39.6px;
  height: 100%;
  top: -6.5px;
  left: ${({idx}) => (idx * 39)}px;
  background: url(${banner1}) no-repeat;
  background-size: 977px auto;
  background-position: -${({idx}) => (idx * 39.6)}px  center;
  transform-style: preserve-3d;
  transform: rotateY(${({ currentRotate }) => currentRotate}deg);
  transition: transform 2s ${({ idx }) => idx * 0.15}s;
  ${({ resetRotate }) => resetRotate && `transition: none`};
  transform-origin: center center -8.666px;
  image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
  image-rendering: pixelated; /* 일반 브라우저용 */
  &:after {
    background: url(${banner2})  no-repeat;
    width: 100%;
    left: 100%;
    transform: rotateY(120deg);
    transform-origin: left top;
  }
  &:before {
    background: url(${banner3}) no-repeat;
    width: 100%;
    left: -100%;
    transform: rotateY(240deg);
    transform-origin: right top;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    background-size: 977px auto;
    background-position: -${({idx}) => (idx * 39.6)}px  center;
    top: -2px;
    image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
    image-rendering: pixelated; /* 일반 브라우저용 */
  }
  @media(max-width: 937px){
    width: 4.3vw;
    background-size: 104.2689vw auto;
    background-position: -${({idx}) => (idx * ( 39.6 / 937 * 100))}vw  center;
    left: ${({idx}) => (idx * 4.1622)}%;
    &:before,
    &:after {
      background-size: 104.2689vw auto;
      background-position: -${({idx}) => (idx * ( 40 / 937 * 100))}vw  center;
    }
  }
  
`;
