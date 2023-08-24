import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo_white from '@/src/assets/images/white.svg';
import notion from '@/src/assets/images/notion.png';
import Link from 'next/link';

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
        <SNSBox>
          <Link href={'https://www.notion.so/5cc93c00074a43c2834d67c2276a2153?pvs=4'} target="_blank" title='노션'>
            <span className='blind'>노션</span>
          </Link>
        </SNSBox>
      </FooterContainer>
    </FooterWrap>
  );
};

export default Footer;



const SNSBox = styled.div`
  width: 30px;
  height:30px;
  a{
    display:block;
    width:100%;
    height:100%;
    background : url(${notion.src}) no-repeat center center/100% 100%;
    transition: opacity .2s;
    &:hover{
      opacity : .5;
    }
  }
  @media(max-width: 470px){
    display:none;
  }
`

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
