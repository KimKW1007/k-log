import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo_white from '@/src/assets/images/white.svg';
const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>
        <FooterLogoBox>
          <Image src={logo_white} alt={'로고'}  ></Image>
          <h2>K : Log</h2>
        </FooterLogoBox>
        <FooterCopyRight>
          COPYRIGHT &copy; 2023 Kim Kyenong Won.
          <br /> ALL RIGHTS RESERVED.
        </FooterCopyRight>
        <EmptyBox></EmptyBox>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;

const EmptyBox = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

const FooterWrap = styled.footer`
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const FooterContainer = styled(OnlyAlignCenterFlex)`
  justify-content: space-between;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 40px;
  border-top: 1px solid rgba(128, 128, 128, 0.3);
  @media (max-width: 700px) {
    margin-right: 30px;
    padding: 20px 20px;
  }
`;

const FooterLogoBox = styled(OnlyAlignCenterFlex)`
  flex-shrink: 0;

  h2 {
    margin-left: 10px;
  }
  img{
    width: 40px;
    height: 40px;
  }
  @media (max-width: 700px) {
    margin-right: 30px;
    img {
      width: 30px;
      height: 30px;
    }
    h2 {
      font-size: 20px;
    }
  }
`;

const FooterCopyRight = styled.div`
  font-size: 15px;
  line-height: 20px;
  br {
    display: none;
  }
  @media (max-width: 700px) {
    font-size: 13px;
    br {
      display: block;
    }
  }
`;
