"use client";
import Banner from '@/src/components/banner/Banner';
import HomeContent from '@/src/components/home/HomeContent';
import React from 'react'
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomeWrap>
      <Banner></Banner>
      <HomeContent></HomeContent>
    </HomeWrap>
  )
}

export default HomePage
 
const HomeWrap = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;