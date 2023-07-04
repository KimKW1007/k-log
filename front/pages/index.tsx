import type { NextPage } from 'next';
import Banner from '@components/banner/Banner';
import styled, { keyframes, css } from 'styled-components';
import { useEffect } from 'react';

const Home: NextPage = () => {

  return (
    <HomeWrap>
      <Banner></Banner>
      <EmptyBox></EmptyBox>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div`
  width:100%;
  height:100%;
`;

const EmptyBox = styled.div`
position: relative;
min-height: 1000px;
width: 100%;
transform-style: preserve-3d;
background: #fafafa;
box-shadow: 0 0 20px #333;
z-index: 1;
`