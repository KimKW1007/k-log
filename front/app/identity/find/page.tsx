import FindPageInner from '@/src/app/identity/FindPageInner'
import { Metadata, NextPage } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "아이디/비밀번호 찾기 | K : Log",
  description: "K:Log를 이용하셨던/이용하시는 회원분의 아이디/비밀번호 등을 찾는 곳이에요!",
}

const FindPage: NextPage = () => {
  return (
    <FindPageInner />
  )
}

export default FindPage