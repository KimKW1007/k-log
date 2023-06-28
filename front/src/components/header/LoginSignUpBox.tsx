import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LoginSignUpBox = () => {
  return (
    <>
      <LoginText href={'/login'} title="로그인">
        로그인
      </LoginText>
      <SignupText href={'/signup'} className="rightLine" title="회원가입">
        회원가입
      </SignupText>
    </>
  );
};

export default LoginSignUpBox;

const LoginSignUpText = styled(Link)`
  padding: 0.5rem ${({ theme }) => theme.rem.p12};
  margin : 0 0.313em;
  transition:  .3s;
  border-radius: 6px;
  font-size: 13px;
  &:hover{
    color: #fff;
  }
`;

const LoginText = styled(LoginSignUpText)`
  &:hover{
    background: #408E91;
  }
`
const SignupText = styled(LoginSignUpText)`
  background: #9DB2BF;
  &:hover{
    background: #454545;
  }
`

const ShortLine = styled.i`
  display: inline-block;
  width: 1px;
  height: 1em;
  background: black;
`;
