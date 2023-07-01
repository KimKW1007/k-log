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
          <SignupForm />
        </SignupInnerBox>
      </SignupWrap>
  );
};

export default SignUpPage;
const SignupWrap = styled(OnlyAlignCenterFlex)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.rem.p100} ${({ theme }) => theme.rem.p100};
  justify-content: flex-end;
  background : #242424;
`;

const SignupInnerBox = styled(PageInnerBox)`
  position: relative;
  height: 100%;
  box-shadow: 0 0px 25px 20px rgba(155, 155, 155, 0.4);
`;
