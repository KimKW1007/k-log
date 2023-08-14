import { ChildrenProps } from '@src/types/children';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Header } from '@components/header/Header';
import IconLinkListBox from '@components/common/IconLinkListBox';
import Footer from '@components/footer/Footer';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@atoms/atoms';
import SearchModal from 'src/search/SearchModal';

const Layout = ({ children }: ChildrenProps) => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const [isAboutAuth, setIsAboutAuth] = useState(false);
  const router = useRouter();
  const routerPathCheck = (value: string) => {
    return router.pathname.includes(value);
  };

  const popupPage = routerPathCheck('/identity/find') || routerPathCheck('/accountEdit/changeEmail');
  useEffect(() => {
    if (routerPathCheck('login') || routerPathCheck('signup') || popupPage) {
      setIsAboutAuth(true);
    } else {
      setIsAboutAuth(false);
    }
  }, [router]);

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
