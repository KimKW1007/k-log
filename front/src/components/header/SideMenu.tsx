import SidebarCategoryBox from '@/src/components/sideBar/SidebarCategoryBox';
import SidebarHeader from '@/src/components/sideBar/SidebarHeader';
import React from 'react';
import styled, { css } from 'styled-components';
import HamburgerMenuBtn from './HamburgerMenuBtn';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { userInfomation } from '@/src/atoms/atoms';
import { useRecoilState } from 'recoil';
import HeaderUserMenu from './HeaderUserMenu';
import LoginSignUpBox from './LoginSignUpBox';
import Link from 'next/link';
import SearchBox from '../search/SearchBox';
import useIsMount from '@/src/hooks/useIsMount';
import useHandleSideMenu from '@/src/hooks/useHandleSideMenu';

const SideMenu = () => {
  const { handleClickMenu, isOpen, isActive } = useHandleSideMenu();
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const { isMount } = useIsMount();

  return (
    <>
      <HamburgerMenuBtn handleClickMenu={handleClickMenu} isOpen={isOpen} />
      {isActive && (
        <SideMenuWrap>
          <SideMenuDim isOpen={isOpen} onClick={handleClickMenu} />
          <SideMenuArea className="customScroll">
            <SideMenuContainer>
              <LogoBox>
                <Link href="/">K : Log</Link>
              </LogoBox>
              <RelevantToTheUser>{isMount && userInfo ? <HeaderUserMenu isInSideMenu /> : <LoginSignUpBox isInSideMenu />}</RelevantToTheUser>
              <SidebarBox>
                <SidebarHeader />
                <SearchBox />
                <SidebarCategoryBox isMenu />
              </SidebarBox>
              <SideMenuFooter>
                COPYRIGHT &copy; 2023 Kim Kyenong Won.
                <br />
                ALL RIGHTS RESERVED.
              </SideMenuFooter>
            </SideMenuContainer>
          </SideMenuArea>
        </SideMenuWrap>
      )}
    </>
  );
};

export default SideMenu;

const SideMenuWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
`;
const SideMenuDim = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
  transition: opacity 0.6s;
  ${({ isOpen }) =>
    isOpen &&
    css`
      & + div {
        transform: translate(0, 0);
      }
    `}
`;
const SideMenuArea = styled.div`
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translate(100%, 0);
  z-index: 11;
  width: 90%;
  max-width: 360px;
  height: 97%;
  background: ${({ theme }) => theme.color.darkBg};
  border-radius: 30px 0 0 30px;
  transition: transform 0.6s;
  overflow: hidden;
  color: #fff;
  background: #23262d;
  padding: 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    margin-top: 100px;
  }
`;

const SidebarBox = styled(OnlyAlignCenterFlex)`
  flex-direction: column;
  row-gap: 30px;
`;

const RelevantToTheUser = styled(AllCenterFlex)`
  padding: 15px 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
`;

const LogoBox = styled.div`
  user-select: none;
  a {
    display: inline-block;
    transition: text-shadow 0.2s;
    &:hover {
      text-shadow: #fc0 1px 0 10px;
    }
  }
`;

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const SideMenuFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.lightGrey};
  font-size: 12px;
  padding: 20px 0 0;
  line-height: 20px;
`;
