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
        </TitleDescBox>
      </TitleBox>
      <HomeNewPosterList></HomeNewPosterList>
      <ProjectSlide />
    </HomeNewPosterWrap>
  );
};

export default HomeNewPoster;

const HomeNewPosterWrap = styled.div`
  width:1138px;
  display: flex;
  flex-direction: column;
  margin : 0 auto;
  @media(max-width: 1600px){
    width:100%;
  }
`;

const TitleBox = styled(OnlyAlignCenterFlex)`
  max-width: 380px;
  width:100%;
  box-shadow: 15px 10px 5px 3px rgba(0, 0, 0, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.1);
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 40px;
  justify-content: space-between;
  margin-bottom: 110px;
  @media(max-width:937px){
    margin-bottom: 60px;
  }
`;
const Title = styled.h2`
  font-size: 40px;
`;
const TitleDescBox = styled.div`
  p {
    font-size: 24px;
  }
`;
