import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes, css } from 'styled-components';

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
    </HomeNewPosterWrap>
  )
}

export default HomeNewPoster


const HomeNewPosterWrap = styled.div`
  flex:1;
`

const TitleBox = styled(OnlyAlignCenterFlex)`
  display: inline-flex;
  box-shadow : 15px 10px 5px 3px rgba(0,0,0,.2);
  padding: 20px 40px;
`
const Title = styled.h2`
  font-size: 40px;
  margin-right: 40px;
`
const TitleDescBox = styled.div`
  p{
    padding: 2px 0;
  }
`