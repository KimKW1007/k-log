'use client';
import LoginForm from '@/src/components/login/LoginForm';
import React from 'react'
import styled from 'styled-components';

const LoginPageInner = () => {
  return (
    <LoginWrap>
      <LoginInnerBox>
        <LoginForm />
      </LoginInnerBox>
    </LoginWrap>
  )
}

export default LoginPageInner

const LoginWrap = styled.div`
  position:relative;
  z-index: 3;
  width: 100%;
  height:100%;
  min-height:1000px;
  padding:150px  50px ;
  display:flex;
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
    min-height:630px;
  }
`;

const LoginInnerBox = styled(PageInnerBox)`
  box-shadow: 0 0px 25px 20px rgba(155,155,155,.4);
`;
