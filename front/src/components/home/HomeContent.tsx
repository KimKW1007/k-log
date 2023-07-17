import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPoster from './HomeNewPoster';
import HomeSidebar from './HomeSidebar';

const HomeContent = () => {
  const [isRemoveSidebar, setIsRemoveSidebar] = useState(false);

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      if(window.innerWidth <= 1600){
        setIsRemoveSidebar(true);
      }else{
        setIsRemoveSidebar(false);
      }
    })
  })

  return (
    <ContentsWrap>
      <ContentsContainer>
        <HomeNewPoster/>
        {isRemoveSidebar || <HomeSidebar/>}
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
box-shadow: 0 -30px 60px 1px #333;
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