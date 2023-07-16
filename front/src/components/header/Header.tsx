import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo_white from '@images/white.svg';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import LoginSignUpBox from './LoginSignUpBox';
import HeaderUserMenu from './HeaderUserMenu';
import CategoryBox from '@components/category/CategoryBox';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const [isMount, setIsMount] = useState<boolean>(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <HeaderBox isHome={router.pathname === '/'}>
      <HeaderInnerBox>
        <LogoAndCategoryBox>
          <CategoryBox></CategoryBox>
          <LogoBox>
            <Link href={'/'} title="K - Blog">
              <Image src={logo_white} alt={'로고'}></Image>
            </Link>
          </LogoBox>
        </LogoAndCategoryBox>
        <KlogText>K : Log</KlogText>
        <BtnBox>{isMount && userInfo ? <HeaderUserMenu /> : <LoginSignUpBox />}</BtnBox>
      </HeaderInnerBox>
    </HeaderBox>
  );
};

const KlogText = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const HeaderBox = styled.header<{isHome : boolean;}>`
  position: relative;
  z-index: 16;
  width: 100%;
  height: ${({ theme }) => theme.rem.p70};
  padding: 0 ${({ theme }) => theme.rem.p30};
  background: #111111;
  color: #fff;
  ${({isHome}) => isHome &&`
    box-shadow: 0 10px 30px 1px #333;
  `}
`;
const HeaderInnerBox = styled(OnlyAlignCenterFlex)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.rem.p30};
  justify-content: space-between;
`;
const LogoBox = styled(OnlyAlignCenterFlex)`
  width: ${({ theme }) => theme.rem.p50};
  height: 100%;
  margin-left: 180px;
  img {
    max-width: 100%;
  }
`;

const BtnBox = styled(OnlyAlignCenterFlex)``;

const LogoAndCategoryBox = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;
