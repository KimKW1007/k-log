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
const SignupWrap = styled.div`
  position: relative;
  display:flex;
  width: 100%;
  padding:150px  50px ;
  justify-content: flex-end;
  @media(max-width: 660px){
    padding: 100px   20px ;
  }
`;

const SignupInnerBox = styled(PageInnerBox)`
  position: relative;
  height: 710px;
  box-shadow: 0 0px 25px 20px rgba(155, 155, 155, 0.4);
`;
