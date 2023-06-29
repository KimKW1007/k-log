import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SignupForm from '@components/signup/signupForm';
import { PageInnerBox } from '@pages/login';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const SignUpPage: NextPage = () => {
  return (
    <SignupWrap>
      <SignupInnerBox>
        <SignupForm/>
      </SignupInnerBox>
    </SignupWrap>
  );
};

export default SignUpPage;
const SignupWrap = styled(OnlyAlignCenterFlex)`
  width: 100%;
  height:100%;
  padding:${({ theme }) => theme.rem.p100}  ${({ theme }) => theme.rem.p100};
`;

const SignupInnerBox = styled(PageInnerBox)`
  height:100%;
  border: 1px solid #000;
`;
