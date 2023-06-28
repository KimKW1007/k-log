import React from 'react'
import Link from 'next/link';
import styled from 'styled-components';

const LoginErrBox = () => {
  return (
    <ErrMsgBox>
      <p>아이디 또는 비밀번호가 일치하지 않습니다.</p>
      <p>계정을 찾고 싶으신 경우에는 이 <Link href={'/'}>페이지</Link>를 방문하여 확인해주세요. </p>
    </ErrMsgBox>
  )
}

export default LoginErrBox

const ErrMsgBox =styled.div`
  color: ${({ theme }) => theme.color.err};
  margin-bottom: 30px;
  font-size: 18px;
  text-align:center;
  word-break: keep-all;
  a{
    font-weight: bold;
    color:  #F55050;
    margin-bottom: 30px;
  }
`