import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import HomeNewPosterList from './HomeNewPosterList';
import { FlexEmptyBox } from '@components/signup/signupForm';
import ProjectSlide from '@components/projectBanner/ProjectSlide';

const HomeNewPoster = () => {
  return (
    <HomeNewPosterWrap>
      <TitleBox>
        <Title>K : Log</Title>
        <TitleDescBox>
          <p>New Post</p>
          <p>개발공부(common)</p>
        </TitleDescBox>
      </TitleBox>
      <FlexEmptyBox />
      <HomeNewPosterList></HomeNewPosterList>
      <ProjectSlide />
    </HomeNewPosterWrap>
  );
};

export default HomeNewPoster;

const HomeNewPosterWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled(OnlyAlignCenterFlex)`
  width: 380px;
  box-shadow: 15px 10px 5px 3px rgba(0, 0, 0, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.1);
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 40px;
`;
const Title = styled.h2`
  font-size: 40px;
  margin-right: 40px;
`;
const TitleDescBox = styled.div`
  p {
    padding: 2px 0;
  }
`;
