import LoginPageInner from '@/src/app/login/LoginPageInner'
import { Metadata, NextPage } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '로그인 | K : Log',
  description:"K:Log를 알게 되신것에 대해 되게 감사합니다. 로그인 하시고 K:Log를 둘러보세요!"
}

const LoginPage : NextPage = () => {
  return (
    <LoginPageInner />
  )
}

export default LoginPage