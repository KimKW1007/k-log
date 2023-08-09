
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import BannerItem from './BannerItem';
import { currentBanner } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import {banner} from '@utils/bannerList';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import {useRouter} from "next/router";
import customApi from '@utils/customApi';
import { GET_BANNER_LIST } from '@utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
  const router= useRouter();
  const innerBoxRef = useRef<HTMLDivElement>(null);
  const bannerList = new Array(24).fill(undefined).map((val, idx) => idx);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [currentBg, setCurrentBg] = useState(banner[`banner1`]);
  const [currentBannerNum, setCurrentBannerNum] = useRecoilState(currentBanner);
  const [resetRotate , setResetRotate] = useState(false);

  const [settingState, setSettingState]  = useState(true);


  const {getApi} = customApi('/banner/banners')
  const { data } = useQuery([GET_BANNER_LIST], ()=>getApi());


  // 배너 배경 animation
  useEffect(() => {
  let turnTimer: string | number | NodeJS.Timeout | undefined;
    turnTimer = setInterval(() => {
      if(document.hasFocus() && router.pathname === '/'){
        setCurrentBannerNum((prev) => (prev >= 3 ? (prev = 1) : prev + 1));
        setCurrentRotate((prev) => prev - 120);
      }
    }, 15000);
  return () => {
      clearInterval(turnTimer);
    };
  },[]);
  useEffect(()=>{
    let resetTimer: string | number | NodeJS.Timeout | undefined;
    if(currentRotate === -360){
      resetTimer  = setTimeout(()=>{
        setResetRotate(true)
        setCurrentRotate((prev) => prev = 0 );
        console.log({resetRotate})
        setTimeout(()=>{
          setResetRotate(false)
          console.log({resetRotate})
        },1200)
      },7000)
    }
    return () => {
      clearTimeout(resetTimer);
    };
  },[currentRotate])

  useEffect(()=>{
    setCurrentBg(data?.[currentBannerNum-1]?.imageUrl ||  banner[`banner${currentBannerNum}`])
  },[currentBannerNum])

  useEffect(()=>{
    if(data?.[0]?.imageUrl){
      setCurrentBg(data?.[0]?.imageUrl)
    }else{
      setCurrentBg(banner[`banner${currentBannerNum}`])
    }
  },[])

  useEffect(()=>{
    let settingTimer: string | number | NodeJS.Timeout | undefined;
    settingTimer = setTimeout(()=>{
      setSettingState(false)
    },500)
    return ()=>{clearTimeout(settingTimer)}
  },[])



  // 초기화
  useEffect(() => {
  setCurrentBannerNum(1);
  setCurrentRotate(0);
}, []);



  return (
    <BannerWrap>
      <BannerBgBox>
        <BannerBg settingState={settingState} currentBg={data?.[currentBannerNum-1]?.imageUrl ||  banner[`banner${currentBannerNum}`]} className='banner-background-image'></BannerBg>
      </BannerBgBox>
      <BannerInnerBox ref={innerBoxRef}>
        <BannerSlideBox>
          {bannerList.map((ele,idx) => (
            <BannerItem key={ele + 'salt' + idx} data={data} currentRotate={currentRotate} idx={idx} resetRotate={resetRotate}></BannerItem>
          ))}
        </BannerSlideBox>
      </BannerInnerBox>
    </BannerWrap>
  );
};

export default Banner;
const BannerWrap = styled(AllCenterFlex)`
  position: relative;
  z-index: 18;
  height: 480px;
  width: 100%;
  padding: 30px 0;
 
  @media(max-width:937px){
    padding:  0;
    height: 48.0256vw;
  overflow: hidden;
  }
  @media(max-width: 400px){
    height: 200px;
  }
`;

const BannerBgBox= styled.div`
width:100%;
height:100%;
position: absolute;
left: 0;
top: 0;
overflow:hidden;
`

const BannerBg = styled.div<{ currentBg: string; settingState:boolean;  }>`
  width:100%;
  height:100%;
  background: url(${({currentBg}) => currentBg}) no-repeat center
    center/150% auto;
  filter: blur(5px);
  -webkit-filter: blur(5px); 
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  transform : scale(1.1);
  ${({settingState}) => !settingState && css`
  transition: background 3s 2s;
  `}
  @media(max-width:900px){
    background: #000;
  }
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
    height: 48.0256vw;
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
  width:100%;
  transform-style: preserve-3d;
  display: flex;
  height: 106.5%;
  top: -2%;
  @media(max-width:920px){
    transform: translateY(2px);;
  }
`;
