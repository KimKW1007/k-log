import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import HomeNewPoster from './HomeNewPoster';
import HomeSidebar from './HomeSidebar';

const HomeContent = () => {
  return (
    <ContentsWrap>
      <ContentsContainer>
        <HomeNewPoster/>
        <HomeSidebar/>
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
box-shadow: 0 -5px 50px #333;
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
`