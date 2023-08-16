"use client";
import { ChildrenProps } from '@/src/types/children';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '@/src/components/header/Header';
import IconLinkListBox from '@/src/components/common/IconLinkListBox';
import Footer from '@/src/components/footer/Footer';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@/src/atoms/atoms';
import SearchModal from '../search/SearchModal';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: ChildrenProps) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const [isAboutAuth, setIsAboutAuth] = useState(false);
  const pathname = usePathname();
  const routerPathCheck = (value: string) => {
    return pathname.includes(value);
  };

  const popupPage = routerPathCheck('/identity/find') || routerPathCheck('/accountEdit/changeEmail');
  useEffect(() => {
    if (routerPathCheck('login') || routerPathCheck('signup') || popupPage) {
      setIsAboutAuth(true);
    } else {
      setIsAboutAuth(false);
    }
  }, [pathname]);

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

