import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image'
import logo_white from '@images/white.svg';
const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>
        <FooterLogoBox>
            <Image src={logo_white} alt={'로고'} ></Image>
            <h2>K : Log</h2>
        </FooterLogoBox>
        <FooterCopyRight>
            COPYRIGHT &copy; 2023 Kim Kyenong Won. ALL RIGHTS RESERVED.
        </FooterCopyRight>
        <div></div>
      </FooterContainer>
    </FooterWrap>
  )
}

export default Footer


const FooterWrap = styled.footer`
  position: relative;
  z-index: 2;
  overflow:hidden;
`

const FooterContainer = styled(OnlyAlignCenterFlex)`
  justify-content:space-between;
  width: 1600px;
  margin: 0 auto;
  padding: 40px 40px;
  border-top : 1px solid rgba(128, 128, 128, 0.3);
`

const FooterLogoBox = styled(OnlyAlignCenterFlex)`
  img{
    width: 40px;
  }
  h2{
    margin-left: 10px;
  }
`

const FooterCopyRight = styled.div`
  font-size : 15px;
`