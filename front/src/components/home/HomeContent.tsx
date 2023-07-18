import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPoster from './HomeNewPoster';
import HomeSidebar from './HomeSidebar';
import { useRecoilState } from 'recoil';
import { isRemoveSidebar } from '@atoms/atoms';
import useIsMount from 'src/hooks/useIsMount';
import { useRouter } from 'next/router';
const HomeContent = () => {
  const router = useRouter();
  const [isRemove, setIsRemove] = useRecoilState(isRemoveSidebar);
  const {isMount} = useIsMount();

  const checkNowWindowWidth = ()=>{
    if(window.innerWidth <= 1600){
      setIsRemove(true);
    }else{
      setIsRemove(false);
    }
  }

  useEffect(()=>{
    if(router.pathname === '/'){
      window.addEventListener("resize",()=>{
        checkNowWindowWidth()
      })
    }
    return ()=>window.addEventListener("resize",()=>{})
  })
  useEffect(()=>{
    if(router.pathname === '/'){
      checkNowWindowWidth()
    }
  },[])



  return (
    <ContentsWrap>
      <ContentsContainer>
        <HomeNewPoster/>
        {isMount && (isRemove || <HomeSidebar/>)}
      </ContentsContainer>
    </ContentsWrap>
  )
}

export default HomeContent

const ContentsWrap = styled.div`
position: relative;
min-height: 1000px;
width: 100%;
transform-style: preserve-3d;
z-index: 1;
padding: 100px 30px;
`

const ContentsContainer = styled.div`
  width:100%;
  max-width: 1600px;
  margin: 0 auto;
  height:100%;
  padding: 50px 30px;
  border : 1px solid #444;
  display:flex;
  background: #2a2a2a;
  column-gap: 40px;
`