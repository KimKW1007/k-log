import { Header } from '@components/header/Header';
import type { NextPage } from 'next';
import { currentBanner, userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import Banner from '@components/banner/Banner';
import styled, { keyframes, css } from 'styled-components';
import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  return (
    <HomeWrap>
      <Banner></Banner>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled(OnlyJustifyCenterFlex)`
  position: relative;
  z-index: 2;
  overflow: hidden;
  height: 500px;
  padding: 30px 0;
`;
