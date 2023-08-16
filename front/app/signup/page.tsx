import SignupPageInner from '@/src/app/signup/SignupPageInner'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '회원가입 | K : Log',
  description: "K:Log를 알게 되신것에 대해 되게 감사합니다. 회원가입을 하시고 댓글과 게시물을 통해 원하는 정보를 확인해주세요!",
}
const SignupPage = () => {
  return (
    <SignupPageInner />
  )
}

export default SignupPage