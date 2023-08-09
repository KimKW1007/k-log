import {defaultBanner1, defaultBanner2, defaultBanner3} from '@utils/bannerList';
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


interface BannerItemProps {
  currentRotate: number;
  idx: number;
  resetRotate: boolean;
  data : {
    id : number;
    imageUrl : string;
    listNumber : string;
  }[];
}

interface ItemProps {
  currentRotate: number;
  idx: number;
  resetRotate: boolean;
  banner1 : string
  banner2 : string
  banner3 : string
}


const BaanerItem = ({ currentRotate, idx, resetRotate, data }: BannerItemProps) => {
  const banner1 = data?.[0]?.imageUrl || defaultBanner1;
  const banner2 = data?.[1]?.imageUrl || defaultBanner2;
  const banner3 = data?.[2]?.imageUrl || defaultBanner3;
  return <Item currentRotate={currentRotate} resetRotate={resetRotate} idx={idx} 
banner1={banner1}
banner2={banner2}
banner3={banner3}
  
  ></Item>;
};

export default BaanerItem;
// ${({idx}) => idx * 32 }
// ${({ currentRotate }) => currentRotate}

const Item = styled.div<ItemProps>`
  position: absolute;
  z-index: 50;
  width: 39.8px;
  height: 100%;
  top: -6.5px;
  left: ${({idx}) => (idx * 39)}px;
  background: url(${({banner1}) => banner1}) no-repeat;
  background-size: 977px auto;
  background-position: -${({idx}) => (idx * 39)}px  center;
  transform-style: preserve-3d;
  transform: rotateY(${({ currentRotate }) => currentRotate}deg);
  transition: transform 2s ${({ idx }) => idx * 0.15}s;
  ${({ resetRotate }) => resetRotate && `transition: none`};
  transform-origin: center center -8.666px;
  image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
  image-rendering: pixelated; /* 일반 브라우저용 */
  &:after {
    background: url(${({banner2}) => banner2})  no-repeat;
    width: 102%;
    left: 102%;
    transform: rotateY(120deg);
    transform-origin: left top;
  }
  &:before {
    background: url(${({banner3}) => banner3}) no-repeat;
    width: 102%;
    left: -102%;
    transform: rotateY(240deg);
    transform-origin: right top;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    background-size: 977px auto;
    background-position: -${({idx}) => (idx * 39)}px  center;
    top: -2px;
    image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
    image-rendering: pixelated; /* 일반 브라우저용 */
  }
  @media(max-width: 937px){
    width: 4.2475vw;
    background-size: 104.2689vw auto;
    background-position: -${({idx}) => (idx * 4.1622)}vw  center;
    left: ${({idx}) => (idx * 4.19)}%;
    &:before,
    &:after {
      background-size: 104.2689vw auto;
      background-position: -${({idx}) => (idx * 4.1622)}vw  center;
    }
  }
  @media(max-width: 400px){
    width: 16.984px;
    background-size: 400px auto;
    background-position: -${({idx}) => (idx * 16.219)}px center;
    left:  ${({idx}) => (idx * 16.219)}px;
    &:before,
    &:after {
      background-size: 400px auto;
      background-position: -${({idx}) => (idx * 16.219)}px  center;
    }
  }
`;
