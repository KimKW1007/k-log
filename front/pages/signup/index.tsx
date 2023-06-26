import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SignupForm from '@components/signup/signupForm';
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
  padding:${({ theme }) => theme.rem.p70}  ${({ theme }) => theme.rem.p100};
`;

const SignupInnerBox = styled.div`
  // 550px
  width: 36rem;
  border: 1px solid #000;
  padding: ${({ theme }) => theme.rem.p80} ${({ theme }) => theme.rem.p70} 0;
  background: #fefefe;
`;
