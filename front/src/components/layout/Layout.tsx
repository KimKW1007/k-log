"use client";
import { ChildrenProps } from '@/src/types/children';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '@/src/components/header/Header';
import IconLinkListBox from '@/src/components/common/IconLinkListBox';
import Footer from '@/src/components/footer/Footer';
import { useRecoilState } from 'recoil';
import { searchModalState, userInfomation } from '@/src/atoms/atoms';
import SearchModal from '../search/SearchModal';
import { usePathname } from 'next/navigation';
import customApi from '@/src/utils/customApi';
import GetNewAccessToken from '@/src/app/getNewAccessToken';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { Pen } from '@styled-icons/bootstrap';

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
  const { mutate } = useMutation(logoutApi)
  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) {
      mutate({});
    }
  }, []);
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[pathname])



  return (
    <Root>
      {isAboutAuth ? <IconLinkListBox popupPage={popupPage} /> : <Header />}
      {children}
      {routerPathCheck('/category') && currentUser?.isAdmin && <CreateBoardLink href={'/create'} title='글쓰기'><Pen/></CreateBoardLink>}
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

const CreateBoardLink = styled(Link)`
  position: fixed;
  z-index: 9;
  right: 30px;
  bottom: 30px;
  width: 45px;
  height: 45px;
  padding: 12px;
  border-radius: 50%;
  overflow:hidden;
  background : #fff;
  transition: .4s ease-in-out;
  &:hover{
    background : #ffffffa1;
  }
  svg{
    width:100%;
    color: #232323;
  }
`