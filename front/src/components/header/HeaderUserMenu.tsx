import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import { ArrowDropDown } from '@styled-icons/material-rounded';
import Link from 'next/link';
import customApi from '@utils/customApi';
import { useMutation } from '@tanstack/react-query';
import { ShortLine } from './LoginSignUpBox';

interface MenuItemsType {
  title: string;
  link: string;
  text: string;
}

const HeaderUserMenu = ({ isInSideMenu = false }: { isInSideMenu: boolean }) => {
  const MenuItemList: MenuItemsType[] = [
    {
      title: 'accountEdit',
      link: 'accountEdit',
      text: '계정 설정'
    },
    {
      title: 'logout',
      link: '',
      text: '로그아웃'
    }
  ];
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const { postApi } = customApi('/auth/logout');
  const { mutate } = useMutation(postApi, {
    onError(error) {
      console.log({ error });
    },
    onSuccess(data) {
      console.log({ data });
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token_expiration');
    }
  });
  const logoutFn = (title: string) => () => {
    if (title !== 'logout') return;
    setUserInfo(null);
    mutate({});
  };

  return (
    <UserPlBox $isInSideMenu={isInSideMenu}>
      <UserPlInnerBox $isInSideMenu={isInSideMenu}>
        <span>{userInfo?.userName}</span>
        {isInSideMenu || <ArrowIcon />}
      </UserPlInnerBox>
      <UserPlMenuBox $isInSideMenu={isInSideMenu}>
        <PlMenuInnerBox>
          {MenuItemList.map(({ link, text, title }: MenuItemsType, idx) => (
            <React.Fragment key={link + title}>
              <PlMeunItem >
                <Link href={`/${link}`} onClick={logoutFn(title)} title={text}>
                  {text}
                </Link>
              </PlMeunItem>
            {idx === 0 && isInSideMenu && <ShortLine/>}
            </React.Fragment>
          ))}
        </PlMenuInnerBox>
      </UserPlMenuBox>
    </UserPlBox>
  );
};

export default HeaderUserMenu;

const MenuAni = keyframes`
  0%{
    top: 20px;
    opacity: 0;
  }
  100%{
    top: 26px;
    opacity: 1;
  }
`;

const UserPlInnerBox = styled.div<{ $isInSideMenu: boolean }>`
  position: relative;
  font-size: ${({ theme }) => theme.rem.p14};
  overflow: hidden;
  pointer-events: none;
  user-select:none;
  span {
    font-weight: bold;
    letter-spacing: 0.5px;
  }
  ${({ $isInSideMenu, theme }) =>
    $isInSideMenu
      ? css`
      text-align:center;
      span{
        display: inline-block;
        padding: 8px 20px;
        background: rgba(128, 128, 128, 0.2);
        border-radius: 6px;

      }
      `
      : css`
          border-radius: ${theme.rem.p10};
          background: rgba(128, 128, 128, 0.2);
          span {
            display: block;
            padding: 8px ${theme.rem.p34} 8px 16px;
            
          }
        `}
`;



const PlMenuInnerBox = styled.ul`
  background: #292929;
  border-radius: 8px 0 0 8px;
  padding: ${({ theme }) => theme.rem.p10} 0;
  border-right: 4px solid ${({ theme }) => theme.color.err};
`;
const PlMeunItem = styled.li`
  width: 160px;
  margin: 0.313rem ${({ theme }) => theme.rem.p16};
  a {
    display: block;
    font-size: 14px;
    padding: ${({ theme }) => theme.rem.p10};
    border-radius: 4px;
    color: #fff;
    &:hover {
      background: #484848;
    }
  }
`;
const UserPlMenuBox = styled.div<{ $isInSideMenu: boolean }>`
  ${({ $isInSideMenu, theme }) =>
    $isInSideMenu
      ? css`
          ${PlMenuInnerBox}{
            margin-top: 0;
            background: transparent;
            border-radius: 0;
            padding: 0;
            border-right: 0;
            margin-top : 20px;
            display:flex;
            align-items:center;
            ${PlMeunItem}{
              width: auto;
              margin: 0;
              a{
                padding: 0.5rem ${({ theme }) => theme.rem.p12};
                font-size: 15px;
                color:rgba(255,255,255,.5);
                border-radius: 0;
                transition: .3s;
                &:hover {
                  background: transparent;
                  color:rgba(255,255,255,1);
                }
              }
            }
          }
        `
      : css`
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          opacity: 0;
          padding-top: ${({ theme }) => theme.rem.p12};
        `}
`;
const ArrowIcon = styled(ArrowDropDown)`
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 2em;
  transition: 0.3s;
`;
const UserPlBox = styled.div<{ $isInSideMenu: boolean }>`
  position: relative;
 
  ${({ $isInSideMenu }) =>
  $isInSideMenu
      ? css`
          
        `
      : css`
      &:hover {
        ${UserPlInnerBox} {
          svg {
            transform: translateY(-50%) rotate(180deg);
          }
        }
        ${UserPlMenuBox} {
          display: block;
          animation: ${MenuAni} 0.4s forwards;
        }
      }
        `}
`;
