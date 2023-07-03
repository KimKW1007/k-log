import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BannerItem from './BannerItem';
import { currentBanner } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import {banner1, banner2, banner3} from '@utils/bannerList';

const Banner = () => {
  
  const innerBoxRef = useRef<HTMLDivElement>(null);
  const [innerBoxWidth, setInnerBoxWidth] = useState(0);
  const [innerBoxHeight, setInnerBoxHeight] = useState(0);

  const [itemLength, setItemLength] = useState(0);
  const bannerList = new Array(itemLength).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState(0);

  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);



  useEffect(() => {
    innerBoxWidth && setItemLength(Math.floor(innerBoxWidth / 39));
  }, [innerBoxWidth]);
  useEffect(() => {
    const turnTimer = setInterval(() => {
      setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
      setCurrentRotate((prev) => prev - 120);
    }, 10000);
    return () => {
      clearInterval(turnTimer);
    };
  });

  useEffect(() => {
    if (innerBoxRef.current) {
      setInnerBoxWidth(innerBoxRef.current?.offsetWidth);
      setInnerBoxHeight(innerBoxRef.current?.offsetHeight);
    }
  }, [innerBoxRef.current]);
  return (
    <>
      <BannerBgBox currentBannerNum={currentBannerNum}/>
      <BannerInnerBox ref={innerBoxRef}>
        <BannerWrap>
          {bannerList.map((ele) => (
            <BannerItem key={'salt' + ele} currentRotate={currentRotate} boxWidth={innerBoxWidth} boxHeight={innerBoxHeight} delay={ele}></BannerItem>
          ))}
        </BannerWrap>
      </BannerInnerBox>
    </>
  );
};

export default Banner;

const BannerInnerBox = styled.div`
  position: relative;
  z-index: 2;
  height: 90%;
  width: 937px;
  margin: auto;
  overflow: hidden;
`;

const BannerWrap = styled.div`
  position: relative;
  z-index: 9;
  transform-style: preserve-3d;
  display: flex;
  height: 106%;
  top: -1.9%;
  transform: rotateX(-20deg);
`;

const BannerBgBox= styled.div<{currentBannerNum : number}>`
  position: absolute;
  z-index: 1;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background-image: url(${({currentBannerNum}) => currentBannerNum === 1 ? banner1 : currentBannerNum === 2? banner2 : banner3});
  background-size: cover;
  background-position: center center;
  transition: background 3s 3s;
`