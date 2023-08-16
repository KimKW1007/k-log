'use client';
import SignupForm from '@/src/components/signup/signupForm';
import React from 'react';
import styled from 'styled-components';
import { PageInnerBox } from '../login/LoginPageInner';

const SignupPageInner = () => {
  return (
    <SignupWrap>
      <SignupInnerBox>
        <SignupForm />
      </SignupInnerBox>
    </SignupWrap>
  );
};

export default SignupPageInner;

const SignupWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height:100%;
  min-height:1000px;
  padding: 120px 80px;
  @media (max-width: 740px) {
    padding: 100px 20px;
  }
`;

const SignupInnerBox = styled(PageInnerBox)`
  position: relative;
  display: flex;
  height: 710px;
  box-shadow: 0 0px 25px 20px rgba(155, 155, 155, 0.4);
  margin: auto 0 auto auto;
  @media (max-width: 740px) {
    margin: auto;
  }
`;
