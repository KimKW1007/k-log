import React from 'react';
import type { NextPage } from 'next';
import LoginForm from '@components/login/LoginForm';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import styled from 'styled-components';

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
  height: 100%;
`;

const LoginInnerBox = styled.div`
  // 550px
  width: 36rem;
  border: 1px solid #000;
  padding:${({theme})=>theme.rem.p80} ${({theme})=>theme.rem.p70} 0;
  background: #fefefe;
`;
