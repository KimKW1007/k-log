import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import SignupForm from '@components/signup/signupForm';
import { PageInnerBox } from '@pages/login';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import { GetServerSideProps, NextPage } from 'next';
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
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  return {
    props : {}
  }
});
export default SignUpPage;
const SignupWrap = styled.div`
  position: relative;
  display:flex;
  width: 100%;
  padding: 120px 80px;
  @media(max-width: 740px){
    padding: 100px 20px;
  }
`;

const SignupInnerBox = styled(PageInnerBox)`
  position: relative;
  display:flex;
  height: 710px;
  box-shadow: 0 0px 25px 20px rgba(155, 155, 155, 0.4);
  margin: auto 0 auto auto;
  @media(max-width: 740px){
    margin: auto;
  }
`;
