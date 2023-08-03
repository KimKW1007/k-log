
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
  const [itemLength, setItemLength] = useState(24);
  const bannerList = new Array(itemLength).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState(banner[`banner1`]);
  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);
  const [resetRotate , setResetRotate] = useState(false);

  const INNER_BOX_WIDTH = 937;
  const ONE_ITEM_WIDTH = INNER_BOX_WIDTH / 24;




/*   // 배너 배경 animation
  useEffect(() => {
  let turnTimer: string | number | NodeJS.Timeout | undefined;
    turnTimer = setInterval(() => {
      if(document.hasFocus() && router.pathname === '/'){
        setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
        setCurrentRotate((prev) => prev - 120);
      }
    }, 10000);
  return () => {
      clearInterval(turnTimer);
    };
  },[]);
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
  },[]) */


  return (
    <BannerWrap>
      <BannerBg currentBg={currentBg} className='banner-background-image'></BannerBg>
      <BannerInnerBox ref={innerBoxRef}>
        <BannerSlideBox>
          {bannerList.map((ele,idx) => (
            <BannerItem key={ele + 'salt' + idx} currentRotate={currentRotate} idx={idx} resetRotate={resetRotate}></BannerItem>
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
  height: 480px;
  width: 100%;
  padding: 30px 0;
 
  @media(max-width:937px){
    padding:  0;
    height: 48.0256vw;
  }
  @media(max-width: 400px){
    height: 200px;
  }
`;

const BannerBg = styled.div<{ currentBg: string;  }>`
  position: absolute;
  left: 0;
  top: 0;
  width:100%;
  height:100%;
  background: url(${({currentBg}) => currentBg}) no-repeat center
    center/200% auto;
  transition: background 3s 3s;
  filter: blur(5px);

`

const BannerInnerBox = styled.div`
  position: relative;
  height: 450px;
  max-width: 937px;
  width:100%;
  overflow: hidden;
  outline : 10px solid #435B66;
  outline-offset: -3px;
  transform: translateY(40px);
  transition: transform .3s ease-in-out;
  box-shadow:  0 10px 12px  1px #fff;


  @media(max-width:937px){
    transform: translateY(0);
    width:100%;
    height: 50.0256vw;
    outline : 0;
    box-shadow:  0 0px 12px  1px #fff;
  }
  @media(max-width: 400px){
    height: 200px;
  }
`;

const BannerSlideBox = styled.div`
  position: relative;
  z-index: 4;
  transform-style: preserve-3d;
  display: flex;
  height: 106.5%;
  top: -2%;
`;
