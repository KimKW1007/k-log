import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import logo_black from "@images/black.svg"
export const Header = () => {
  return (
    <HeaderBox>
      <HeaderInnerBox>
        <Logo>
          <Link href={"/"}>
            <Image src={logo_black} alt={''}></Image>
          </Link>
        </Logo>
        <BtnBox>
          <LoginSignUpText href={'/login'} title='로그인'>로그인</LoginSignUpText>
          <ShortLine/>
          <LoginSignUpText href={'/signup'} className='rightLine' title='회원가입'>회원가입</LoginSignUpText>
        </BtnBox>
      </HeaderInnerBox>
    </HeaderBox>
  )
}

const HeaderBox = styled.header`
  width:100%;
  height:${({theme})=> theme.rem.p60};
  padding: 0 ${({theme})=> theme.rem.p50};
  box-shadow: 0 0 20px  #eee;
`
const HeaderInnerBox = styled.div`
  width:100%;
  height:100%;
  padding: 0 ${({theme})=> theme.rem.p30};
  display:flex;
  align-items: center;
  justify-content:space-between;
`
const Logo = styled.div`
  width: ${({theme})=> theme.rem.p50};
  height: 100%;
  display:flex;
  align-items: center;
  img{
    max-width:100%;
  }
`

const BtnBox = styled.div`
  display:inline-flex;
  font-size: 12px;
`
const LoginSignUpText = styled(Link)`
  margin: 0 ${({theme})=> theme.rem.p10};
`

const ShortLine = styled.i`
  display: inline-block;
  width: 1px;
  height: 1em;
  background : black;
`