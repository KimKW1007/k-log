import { ChildrenProps } from '@src/types/children';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { Header } from '@components/header/Header';
import IconLinkListBox from '@components/common/IconLinkListBox';
import Footer from '@components/footer/Footer';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { searchModalState } from '@atoms/atoms';
import SeachModal from 'src/search/SeachModal';

const Layout = ({ children }: ChildrenProps) => {
  const [isOpenSeachModal, setIsOpenSearchModal] = useRecoilState(searchModalState);
  const [isAboutAuth, setIsAboutAuth] = useState(false);
  const router = useRouter();
  const routerPathCheck = (value: string) => {
    return router.pathname.includes(value);
  };

  const {getApi} = customApi('/board/getSearchBoard');
  const {data : searchData} = useQuery(["GET_SEARCH_DATA"], ()=> getApi());
  console.log({searchData})
  const popupPage = routerPathCheck('/identity/find') || routerPathCheck('/accountEdit/changeEmail')
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
      {isOpenSeachModal && <SeachModal boards={searchData} onClose={()=>setIsOpenSearchModal(false)}/>}
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
