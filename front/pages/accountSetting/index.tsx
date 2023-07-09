import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { NextPage } from 'next';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import UserInfoSideBar from '@components/sideBar/UserInfoSideBar';
import UserInfoSetting from '@components/user/UserInfoSetting';

const AccountSettingPage: NextPage = () => {
  return (
    <SettingWrap>
      <SettingInnerBox>
        <SideProfileSettingBox>
          <UserInfoSideBar></UserInfoSideBar>
        </SideProfileSettingBox>
        <UserInfoSettingBox>
          {<UserInfoSetting></UserInfoSetting>}
        </UserInfoSettingBox>
      </SettingInnerBox>
    </SettingWrap>
  );
};

export default AccountSettingPage;

const SettingWrap = styled(OnlyJustifyCenterFlex)`
  width:100%;
  padding: ${({theme}) => theme.rem.p100} ${({theme}) => theme.rem.p30};
`;
const SettingInnerBox = styled.div`
  width: 1300px;
  display:flex;
  column-gap: ${({theme}) => theme.rem.p30};
`;

const UserInfoSettingBox = styled.div`
  flex-grow: 1;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p60} ${({theme}) => theme.rem.p20};
`;
const SideProfileSettingBox = styled.div`
  width: 360px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p20};
`;
