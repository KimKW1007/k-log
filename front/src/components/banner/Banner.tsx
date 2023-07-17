
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
  const [itemLength, setItemLength] = useState(24);
  const bannerList = new Array(itemLength).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState(banner[`banner1`]);
  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);
  const [resetRotate , setResetRotate] = useState(false);

  const INNER_BOX_WIDTH = 937;
  const ONE_ITEM_WIDTH = INNER_BOX_WIDTH / 24;


  const [isRemoveTurnBanner, setIsRemoveTurnBanner] = useState(false);

  useEffect(() => {
    if((INNER_BOX_WIDTH - innerBoxWidth) >= 0){
      const length = 24 - Math.floor(((INNER_BOX_WIDTH - innerBoxWidth) / ONE_ITEM_WIDTH))
      setItemLength(length);
    }else{
      setItemLength(24)
    }

  }, [innerBoxWidth]);

  // 배너 배경 animation
  /* useEffect(() => {
  let turnTimer: string | number | NodeJS.Timeout | undefined;
  if(!isRemoveTurnBanner){
    turnTimer = setInterval(() => {
      if(document.hasFocus() && router.pathname === '/'){
        setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
        setCurrentRotate((prev) => prev - 120);
      }
    }, 10000);
  }
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

  let resizeTimer: string | number | NodeJS.Timeout | undefined;

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        if (innerBoxRef.current) {
          setInnerBoxWidth(innerBoxRef.current?.offsetWidth);
          setInnerBoxHeight(innerBoxRef.current?.offsetHeight);
        }
        if(window.innerWidth <= 800){
          setIsRemoveTurnBanner(true)
        }else{
          setIsRemoveTurnBanner(false);
        }
      }, 300);
    })
    return ()=>{  window.addEventListener("resize",()=>{})}
  })


  // 초기화
  useEffect(()=>{
    if(window.innerWidth <= 800){
      setIsRemoveTurnBanner(true)
    }else{
      setIsRemoveTurnBanner(false);
    }
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
    <BannerWrap isRemoveTurnBanner={isRemoveTurnBanner}>
      <BannerBg currentBg={currentBg} isRemoveTurnBanner={isRemoveTurnBanner} className='banner-background-image'></BannerBg>
      {isRemoveTurnBanner || <BannerInnerBox ref={innerBoxRef}>
        <BannerSlideBox>
          {bannerList.map((ele,idx) => (
            <BannerItem key={'salt' + idx} currentRotate={currentRotate} boxWidth={innerBoxWidth} boxHeight={innerBoxHeight} delay={idx} resetRotate={resetRotate}></BannerItem>
          ))}
        </BannerSlideBox>
      </BannerInnerBox>}
    </BannerWrap>
  );
};

export default Banner;
const BannerWrap = styled(AllCenterFlex)<{isRemoveTurnBanner : boolean}>`
  position: relative;
  z-index: 1;
  height: 480px;
  width: 100%;
  padding: 30px 0;
  ${({isRemoveTurnBanner}) => isRemoveTurnBanner &&`
  height: 300px;
`}

`;

const BannerBg = styled.div<{ currentBg: string; isRemoveTurnBanner : boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width:100%;
  height:100%;
  background: url(${({currentBg}) => currentBg}) no-repeat center
    bottom/cover fixed;
  transition: background 3s 3s;
  box-shadow: inset 0 -30px 60px 1px #333;
  ${({isRemoveTurnBanner, currentBg}) => isRemoveTurnBanner &&`
    box-shadow: none;
    background: url(${currentBg}) no-repeat center center/cover;
  `}

`

const BannerInnerBox = styled.div`
  position: relative;
  height: 450px;
  max-width: 937px;
  width:90%;
  overflow: hidden;
  outline : 10px solid #435B66;
  outline-offset: -3px;
  transform: translateY(40px);
  transition: transform .3s ease-in-out;
  @media(max-width:1020px){
    transform: translateY(0);
  }
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
