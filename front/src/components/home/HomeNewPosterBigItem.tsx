import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const HomeNewPosterBigItem = () => {
  return (
    <PosterItem>
      <PosterTop>
        <PosterCategory>
          <h3>개발공부/자바스크립트</h3>
        </PosterCategory>
        <PosterTitle>
          <h4>Mapping에 관하여</h4>
        </PosterTitle>
      </PosterTop>
      <PostDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit....</PostDesc>
    </PosterItem>
  );
};

export default HomeNewPosterBigItem;

const PosterTop = styled.div``;

const PosterItem = styled.div`
  width: 460px;
  height: 400px;
  border: 1px solid #de4568;
  padding: 40px 30px;
  margin-right: 30px;
`;

const PosterCategory = styled.div`
  padding: 0 0 20px;
  h3 {
    font-size: 14px;
  }
`;
const PosterTitle = styled.div`
  margin-bottom: 30px;
  h4 {
    font-size: 40px;
  }
`;
const PostDesc = styled.div``;
