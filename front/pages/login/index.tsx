import React from 'react';
import type { NextPage } from 'next';
import LoginForm from '@components/login/LoginForm';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import styled from 'styled-components';
import { AuthSeasonBg } from '@components/login/SeasonBg';
const LoginPage: NextPage = () => {
  return (
    <LoginWrap>
      <LoginInnerBox>
        <LoginForm></LoginForm>
      </LoginInnerBox>
    </LoginWrap>
  );
};

export default LoginPage;

const LoginWrap = styled.div`
  position:relative;
  z-index: 3;
  width: 100%;
  padding:150px  50px ;
  display:flex;
  // background : url(${AuthSeasonBg()}) center center no-repeat;
  // background-size:  cover;
  @media(max-width: 660px){
    padding: 100px   20px ;
  }
`;

export const PageInnerBox = styled.div`
  // 550px
  width: 36rem;
  min-height:700px;
  padding:80px 70px 0;
  background: #fefefe;
  margin: auto;
  @media(max-width: 660px){
    padding: 60px 40px 0;
  }
`;

const LoginInnerBox = styled(PageInnerBox)`
  box-shadow: 0 0px 25px 20px rgba(155,155,155,.4);
`;
