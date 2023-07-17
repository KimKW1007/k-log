import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LoginSignUpBox = ({isInSideMenu} : { isInSideMenu ?: boolean}) => {
  return (
    <>
      <LoginText href={'/login'} title="로그인" isInSideMenu={isInSideMenu}>
        로그인
      </LoginText>
      <ShortLine></ShortLine>
      <SignupText href={'/signup'} className="rightLine" title="회원가입" isInSideMenu={isInSideMenu}>
        회원가입
      </SignupText>
    </>
  );
};

export default LoginSignUpBox;

const LoginSignUpText = styled(Link)<{isInSideMenu ?: boolean}>`
  padding: 0.5rem ${({ theme }) => theme.rem.p12};
  margin : 0 0.313em;
  transition:  .3s;
  border-radius: 6px;
  font-size: 13px;
  color:#fff;
  background: #454545;
  ${({isInSideMenu}) => isInSideMenu &&`
    background: transparent !important;
    font-size: 15px;
    color:rgba(255,255,255,.5);
    &:hover{
      color:rgba(255,255,255,1);
      background: transparent !important;
    }
  `}
`;

const LoginText = styled(LoginSignUpText)`
  &:hover{
    background: #408E91;
  }
  
`
const SignupText = styled(LoginSignUpText)`
  background: #A0BFE0;
  &:hover{
    background: #4A55A2;
  }
  
`

export const ShortLine = styled.i`
  display: inline-block;
  width: 1px;
  height: 1em;
  background: rgba(128,128,128,0.3);
  margin: 0 10px;
`;
