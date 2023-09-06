import React from 'react';
import styled from 'styled-components';

interface BannerItemProps {
  currentRotate: number;
  idx: number;
  resetRotate: boolean;
  bannerItems: string[];
}

interface ItemProps {
  currentRotate: number;
  idx: number;
  resetRotate: boolean;
  banner1: string;
  banner2: string;
  banner3: string;
}

const BaanerItem = ({ currentRotate, idx, resetRotate, bannerItems }: BannerItemProps) => {
  return <Item currentRotate={currentRotate} resetRotate={resetRotate} idx={idx} banner1={bannerItems[0]} banner2={bannerItems[1]} banner3={bannerItems[2]}></Item>;
};

export default BaanerItem;

const Item = styled.div<ItemProps>`
  position: absolute;
  z-index: 50;
  width: 40px;
  height: 100%;
  top: -6.5px;
  left: ${({ idx }) => idx * 39}px;
  background: url(${({ banner1 }) => banner1}) no-repeat;
  background-size: 980px auto;
  background-position: -${({ idx }) => idx * 39}px center;
  transform-style: preserve-3d;
  transform: rotateY(${({ currentRotate }) => currentRotate}deg);
  transition: transform 2s ${({ idx }) => idx * 0.15}s;
  ${({ resetRotate }) => resetRotate && `transition: none`};
  transform-origin: center center -8.666px;
  image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
  image-rendering: pixelated; /* 일반 브라우저용 */
  &:after {
    background: url(${({ banner2 }) => banner2}) no-repeat;
    width: 102%;
    left: 102%;
    transform: rotateY(120deg);
    transform-origin: left top;
  }
  &:before {
    background: url(${({ banner3 }) => banner3}) no-repeat;
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
    background-position: -${({ idx }) => idx * 39}px center;
    top: -2px;
    image-rendering: -webkit-optimize-contrast; /* 웹킷 브라우저용 */
    image-rendering: pixelated; /* 일반 브라우저용 */
  }
  @media (max-width: 937px) {
    width: 4.2475vw;
    background-size: 104.2689vw auto;
    background-position: -${({ idx }) => idx * 4.1622}vw center;
    left: ${({ idx }) => idx * 4.19}%;
    &:before,
    &:after {
      background-size: 104.2689vw auto;
      background-position: -${({ idx }) => idx * 4.1622}vw center;
    }
  }
  @media (max-width: 400px) {
    width: 16.984px;
    background-size: 400px auto;
    background-position: -${({ idx }) => idx * 16.219}px center;
    left: ${({ idx }) => idx * 16.219}px;
    &:before,
    &:after {
      background-size: 400px auto;
      background-position: -${({ idx }) => idx * 16.219}px center;
    }
  }
`;
