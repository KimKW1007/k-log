import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BannerItem from './BannerItem';
import { currentBanner } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import {banner} from '@utils/bannerList';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';

const Banner = () => {
  const innerBoxRef = useRef<HTMLDivElement>(null);
  const [innerBoxWidth, setInnerBoxWidth] = useState(0);
  const [innerBoxHeight, setInnerBoxHeight] = useState(0);
  const [itemLength, setItemLength] = useState(0);
  const bannerList = new Array(itemLength).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState(banner[`banner1`]);
  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);

  useEffect(() => {
    innerBoxWidth && setItemLength(Math.floor(innerBoxWidth / 39));
  }, [innerBoxWidth]);
  // 배너 배경 animation
  useEffect(() => {
    const turnTimer = setInterval(() => {
      setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
      setCurrentRotate((prev) => prev - 120);
    }, 10000);
    return () => {
      clearInterval(turnTimer);
    };
  });

  useEffect(()=>{
    setCurrentBg(banner[`banner${currentBannerNum}`])
  },[currentBannerNum])

  useEffect(() => {
    if (innerBoxRef.current) {
      setInnerBoxWidth(innerBoxRef.current?.offsetWidth);
      setInnerBoxHeight(innerBoxRef.current?.offsetHeight);
    }
  }, [innerBoxRef.current]);
  return (
    <BannerWrap currentBg={currentBg}>
      <BannerInnerBox ref={innerBoxRef}>
        <BannerSlideBox>
          {bannerList.map((ele) => (
            <BannerItem key={'salt' + ele} currentRotate={currentRotate} boxWidth={innerBoxWidth} boxHeight={innerBoxHeight} delay={ele}></BannerItem>
          ))}
        </BannerSlideBox>
      </BannerInnerBox>
    </BannerWrap>
  );
};

export default Banner;
/* ${({ currentBannerNum }) => } */
const BannerWrap = styled(AllCenterFlex)<{ currentBg: string }>`
  position: relative;
  height: 500px;
  width: 100%;
  padding: 30px 0;
  background: url(${({currentBg}) => currentBg}) no-repeat center
    bottom/cover fixed;
  transition: background 3s 3s;
`;

const BannerInnerBox = styled.div`
  position: relative;
  height: 100%;
  width: 937px;
  overflow: hidden;
`;

const BannerSlideBox = styled.div`
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  height: 106.5%;
  top: -2%;
  transform: rotateX(-20deg);
`;
