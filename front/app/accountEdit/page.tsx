import React from 'react'
import { Metadata, NextPage } from 'next'
import AccountEditPageInner from '@/src/app/accountEdit/AccountEditPageInner'

export const metadata: Metadata = {
  title: "계정설정 | K : Log",
  description: "K:Log를 이용하시는 회원분의 계정을 설정하는 곳이에요!",
}

const AccountPage : NextPage = () => {
  return (
    <AccountEditPageInner />
  )
}

export default AccountPage