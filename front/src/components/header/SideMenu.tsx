import SearchBox from 'src/search/SearchBox';
import SidebarCategoryBox from '@components/sideBar/SidebarCategoryBox';
import SidebarHeader from '@components/sideBar/SidebarHeader';
import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import HamburgerMenuBtn from './HamburgerMenuBtn';
import { AllCenterFlex, OnlyAlignCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import useHandleSideMenu from 'src/hooks/useHandleSideMenu';
import useIsMount from 'src/hooks/useIsMount';
import HeaderUserMenu from './HeaderUserMenu';
import LoginSignUpBox from './LoginSignUpBox';
import { OnDeviceTraining } from '@styled-icons/material-rounded';

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
              <LogoBox>K : Log</LogoBox>
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
`;

const LogoBox = styled.div`
  pointer-events: none;
`;

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const SideMenuFooter = styled.div`
  border-top: 1px solid rgba(128, 128, 128, 0.3);
  font-size: 12px;
  padding: 20px 0 0;
  line-height: 20px;
`;
