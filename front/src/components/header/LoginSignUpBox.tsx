import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LoginSignUpBox = () => {
  return (
    <>
      <LoginSignUpText href={'/login'} title="로그인">
        로그인
      </LoginSignUpText>
      <ShortLine />
      <LoginSignUpText href={'/signup'} className="rightLine" title="회원가입">
        회원가입
      </LoginSignUpText>
    </>
  );
};

export default LoginSignUpBox;

const LoginSignUpText = styled(Link)`
  margin: 0 ${({ theme }) => theme.rem.p10};
`;

const ShortLine = styled.i`
  display: inline-block;
  width: 1px;
  height: 1em;
  background: black;
`;
