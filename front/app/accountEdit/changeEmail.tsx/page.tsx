import React from 'react'
import { Metadata, NextPage } from 'next'
import ChangeEmailPageInner from '@/src/app/accountEdit/ChangeEmailPageInner'

export const metadata: Metadata = {
  title: "이메일 변경 | K : Log",
  description: "K:Log를 이용하시는 회원분의 이메일을 변경하는 곳이에요!",
}

const ChangeEmailPage : NextPage = () => {
  return (
    <ChangeEmailPageInner />
  )
}

export default ChangeEmailPage