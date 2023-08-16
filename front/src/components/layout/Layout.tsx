"use client";
import { ChildrenProps } from '@/src/types/children';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '@/src/components/header/Header';
import IconLinkListBox from '@/src/components/common/IconLinkListBox';
import Footer from '@/src/components/footer/Footer';
import { useRecoilState } from 'recoil';
import { searchModalState, userInfomation } from '@/src/atoms/atoms';
import SearchModal from '../search/SearchModal';
import { usePathname } from 'next/navigation';
import actions from '@/app/actions';
import customApi, { baseApi } from '@/src/utils/customApi';
import GetNewAccessToken from '@/src/app/getNewAccessToken';

const Layout = ({ children }: ChildrenProps) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const pathname = usePathname();
  const routerPathCheck = (value: string) => {
    return pathname.includes(value);
  };

  const popupPage = routerPathCheck('/identity/find') || routerPathCheck('/accountEdit/changeEmail');
  const isAboutAuth = routerPathCheck('login') || routerPathCheck('signup') || popupPage

  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const {getNewAccessTokenByrefreshToken, checkAccessToken} = GetNewAccessToken();
  
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (currentUser) {
      checkAccessToken();
      getNewAccessTokenByrefreshToken();
      interval = setInterval(getNewAccessTokenByrefreshToken, 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [currentUser]);

  const { postApi: logoutApi } = customApi('/auth/cleanCookie');
  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) {
      const logoutAsync = async () => {
        try {
          await logoutApi({});
        } catch (e) {
          console.log('Error logging out:', e);
        }
      };
      logoutAsync();
    }
  }, []);


  return (
    <Root>
      {isAboutAuth ? <IconLinkListBox popupPage={popupPage} /> : <Header />}
      {children}
      <Footer />
      {isOpenSearchModal && <SearchModal onClose={() => setIsOpenSearchModal(false)} />}
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

