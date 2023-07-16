import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BannerItem from './BannerItem';
import { currentBanner } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import {banner} from '@utils/bannerList';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import {useRouter} from "next/router";

const Banner = () => {
  const router= useRouter();
  const innerBoxRef = useRef<HTMLDivElement>(null);
  const [innerBoxWidth, setInnerBoxWidth] = useState(0);
  const [innerBoxHeight, setInnerBoxHeight] = useState(0);
  const [itemLength, setItemLength] = useState(0);
  const bannerList = new Array(itemLength).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState(banner[`banner1`]);
  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);
  const [resetRotate , setResetRotate] = useState(false);
  useEffect(() => {
    innerBoxWidth && setItemLength(Math.floor(innerBoxWidth / 39));
  }, [innerBoxWidth]);
  // 배너 배경 animation
 /*  useEffect(() => {
    const turnTimer = setInterval(() => {
      if(document.hasFocus() && router.pathname === '/'){
        setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
        setCurrentRotate((prev) => prev - 120);
      }
    }, 10000);
    return () => {
      clearInterval(turnTimer);
    };
  },[]); */
  useEffect(()=>{
    if(currentRotate === -360){
      setTimeout(()=>{
        setResetRotate(true)
        setCurrentRotate((prev) => prev = 0 );
        setTimeout(()=>{
          setResetRotate(false)
        },100)
      },5500)
    }
  },[currentRotate])

  useEffect(()=>{
    setCurrentBg(banner[`banner${currentBannerNum}`])
    return()=>{}
  },[currentBannerNum])


  // 초기화
  useEffect(()=>{
    return()=>{setCurrentBannerNum(1); setCurrentRotate(0);}
  },[])

  useEffect(() => {
    if (innerBoxRef.current) {
      setInnerBoxWidth(innerBoxRef.current?.offsetWidth);
      setInnerBoxHeight(innerBoxRef.current?.offsetHeight);
    }
    return()=>{}
  }, [innerBoxRef.current]);
  return (
    <BannerWrap>
      <BannerBg currentBg={currentBg} className='banner-background-image'></BannerBg>
      <BannerInnerBox ref={innerBoxRef}>
        <BannerSlideBox>
          {bannerList.map((ele) => (
            <BannerItem key={'salt' + ele} currentRotate={currentRotate} boxWidth={innerBoxWidth} boxHeight={innerBoxHeight} delay={ele} resetRotate={resetRotate}></BannerItem>
          ))}
        </BannerSlideBox>
      </BannerInnerBox>
    </BannerWrap>
  );
};

export default Banner;
const BannerWrap = styled(AllCenterFlex)`
  position: relative;
  z-index: 1;
  height: 600px;
  width: 100%;
  padding: 30px 0;
`;

const BannerBg = styled.div<{ currentBg: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width:100%;
  height:100%;
  background: url(${({currentBg}) => currentBg}) no-repeat center
    bottom/cover fixed;
  transition: background 3s 3s;
`

const BannerInnerBox = styled.div`
  position: relative;
  height: 80%;
  width: 937px;
  overflow: hidden;
  outline : 10px solid #435B66;
  outline-offset: -3px;
`;

const BannerSlideBox = styled.div`
  position: relative;
  z-index: 4;
  transform-style: preserve-3d;
  display: flex;
  height: 106.5%;
  top: -2%;
  transform: rotateX(-20deg);
`;
