import type { NextPage } from 'next';
import Banner from '@components/banner/Banner';
import styled, { keyframes, css } from 'styled-components';
import { useEffect } from 'react';
import SidebarHeader from '@components/sideBar/SidebarHeader';
import HomeContent from '@components/home/HomeContent';

const Home: NextPage = () => {

  return (
    <HomeWrap>
      <Banner></Banner>
      <HomeContent></HomeContent>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div`
  width:100%;
  height:100%;
`

