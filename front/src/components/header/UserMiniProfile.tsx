import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { userInfomation } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import { ArrowDropDown } from '@styled-icons/material-rounded';
import Link from 'next/link';
import customApi from '@utils/customApi';
import { useMutation } from '@tanstack/react-query';

interface MenuItemsType {
  title: string;
  link: string;
  text: string;
}

const UserMiniProfile = () => {
  const MenuItemList: MenuItemsType[] = [
    {
      title: 'accountSetting',
      link: 'accountSetting',
      text: '계정 설정'
    },
    /* {
      title:"myPost",
      link: '/',
      text: '나의 활동'
    }, */
    {
      title: 'logOut',
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
    }
  });
  const logoutFn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUserInfo(null);
    sessionStorage.removeItem('jwtToken');
    mutate({});
  };

  return (
    <UserPlBox>
      <UserPlInnerBox>
        <span>{userInfo?.userName}</span>
        <ArrowIcon />
      </UserPlInnerBox>
      <UserPlMenuBox>
        <PlMenuInnerBox>
          {MenuItemList.map(({ link, text }: MenuItemsType, idx) => (
            <PlMeunItem key={Date.now() + 'salt' + idx}>
              <Link href={`/${link}`} onClick={()=> text === 'logOut' && logoutFn} title={text}>
                {text}
              </Link>
            </PlMeunItem>
          ))}
        </PlMenuInnerBox>
      </UserPlMenuBox>
    </UserPlBox>
  );
};

export default UserMiniProfile;

const MenuAni = keyframes`
  0%{
    top: 26px;
    opacity: 0;
  }
  100%{
    top: 32px;
    opacity: 1;
  }
`;

const UserPlInnerBox = styled.div`
  position: relative;
  background: rgba(128, 128, 128, 0.2);
  border-radius: ${({ theme }) => theme.rem.p10};
  font-size: ${({ theme }) => theme.rem.p14};
  overflow: hidden;
  span {
    display: block;
    padding: 8px ${({ theme }) => theme.rem.p34} 8px 16px;
    pointer-events: none;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

const UserPlMenuBox = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 28px;
  opacity: 0;
`;

const PlMenuInnerBox = styled.ul`
  margin-top: ${({ theme }) => theme.rem.p10};
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

const ArrowIcon = styled(ArrowDropDown)`
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 2em;
  transition: 0.3s;
`;
const UserPlBox = styled.div`
  position: relative;
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
`;
