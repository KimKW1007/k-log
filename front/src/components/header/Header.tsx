import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo_white from '@/src/assets/images/white.svg';
import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { isRemoveSidebar, userInfomation } from '@/src/atoms/atoms';
import { useRecoilState } from 'recoil';
import LoginSignUpBox from './LoginSignUpBox';
import HeaderUserMenu from './HeaderUserMenu';
import CategoryBox from '@/src/components/category/CategoryBox';
import SideMenu from './SideMenu';
import useIsMount from '@/src/hooks/useIsMount';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const Header = () => {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const [isReactive, setIsReactive] = useRecoilState(isRemoveSidebar);
  const [notShowCategory, setNotShowCategory] = useState(false);
  const { isMount } = useIsMount();

  useEffect(() => {
    if (pathname !== '/') {
      setIsReactive(true);
      setNotShowCategory(true);
    } else {
      setNotShowCategory(false);
    }
  }, [pathname]);

  return (
    <HeaderBox>
      <HeaderInnerBox>
        <LogoAndCategoryBox>
          {notShowCategory && <CategoryBox></CategoryBox>}
          <LogoBox isReactive={notShowCategory}>
            <Link href={'/'} title="홈">
              <Image src={logo_white} alt={'로고'} width={50}></Image>
            </Link>
          </LogoBox>
        </LogoAndCategoryBox>
        <KlogTextLogo href={'/'} title="홈">
          <h2>K : Log</h2>
        </KlogTextLogo>
        {isMount && (
          <>
            {isReactive || <BtnBox>{isMount && userInfo ? <HeaderUserMenu isInSideMenu={false} /> : <LoginSignUpBox />}</BtnBox>}
            {isReactive && <SideMenu />}
          </>
        )}
      </HeaderInnerBox>
    </HeaderBox>
  );
};

const KlogTextLogo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  h2 {
    font-size: 34px;
    transition: text-shadow 0.2s;
  }
  &:hover {
    h2 {
      text-shadow: #fc0 1px 0 10px;
    }
  }
  @media (max-width: 700px) {
    h2 {
      font-size: 24px;
    }
  }
`;

const HeaderBox = styled.header`
  position: relative;
  z-index: 14;
  width: 100%;
  height: 70px;
  background: #111111;
  color: #fff;
`;
const HeaderInnerBox = styled(OnlyAlignCenterFlex)`
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  height: 100%;
  padding: 0 30px;
  justify-content: space-between;
`;
const LogoBox = styled(OnlyAlignCenterFlex)<{ isReactive: boolean }>`
  width: 50px;
  height: 100%;
  ${({ isReactive }) =>
    isReactive &&
    `
    margin-left: 180px;
  `}
  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const BtnBox = styled(OnlyAlignCenterFlex)``;

const LogoAndCategoryBox = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;
