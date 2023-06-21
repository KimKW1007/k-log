import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import logo_black from "@images/black.svg"
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex'
import { ChevronDown, ChevronUp } from '@styled-icons/entypo'
export const Header = () => {
  const [isCategoryOn, setIsCategoryOn] = useState(false);
  return (
    <HeaderBox>
      <HeaderInnerBox>
        <LogoAndCategoryBox>
          <CategoryBtn onClick={()=>{setIsCategoryOn(prev => !prev)}}>
              CATEGORY
              {isCategoryOn ? <UpDirection/> : <DownDirection/>}
          </CategoryBtn>
          <LogoBox>
            <Link href={"/"} title='K - Blog'>
              <Image src={logo_black} alt={'로고'}></Image>
            </Link>
          </LogoBox>
        </LogoAndCategoryBox>
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
  padding: 0 ${({theme})=> theme.rem.p30};
  box-shadow: 0 0 20px  #eee;
`
const HeaderInnerBox = styled(OnlyAlignCenterFlex)`
  width:100%;
  height:100%;
  padding: 0 ${({theme})=> theme.rem.p30};
  justify-content:space-between;
`
const LogoBox = styled(OnlyAlignCenterFlex)`
  width: ${({theme})=> theme.rem.p50};
  height: 100%;
  img{
    max-width:100%;
  }
`

const BtnBox = styled(OnlyAlignCenterFlex)`
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

const LogoAndCategoryBox = styled.div`
  display: inline-flex;
  height:100%;
  align-items: center;
`

const CategoryBtn = styled.button`
  display:flex;
  align-items: center;
  justify-content:space-between;
  width: 8rem;
  height: ${({theme})=> theme.rem.p40};
  margin-right: ${({theme})=> theme.rem.p30};
  border-bottom:1px solid #000;
  padding-left : ${({theme})=> theme.rem.p10};
  text-align:left;
  font-size:14px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background:rgba(0,0,0,0);
`

const DownDirection = styled(ChevronDown)`
  width: ${({theme})=> theme.rem.p20};
`
const UpDirection = styled(ChevronUp)`
  width: ${({theme})=> theme.rem.p20};
`

