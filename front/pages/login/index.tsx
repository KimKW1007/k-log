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

const LoginWrap = styled(AllCenterFlex)`
  width: 100%;
  height:100%;
  padding:${({theme})=>theme.rem.p70}  ${({theme})=>theme.rem.p50} ;
  background : url(${AuthSeasonBg()}) center center no-repeat;
  background-size:  cover;
`;

export const PageInnerBox = styled.div`
  // 550px
  width: 36rem;
  padding:${({theme})=>theme.rem.p80} ${({theme})=>theme.rem.p70} 0;
  background: #fefefe;
`;

const LoginInnerBox = styled(PageInnerBox)`
  box-shadow: 25px 25px 18px 10px rgba(0,0,0,.4);
`;
