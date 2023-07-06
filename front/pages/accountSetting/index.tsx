import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { NextPage } from 'next';
import { AllCenterFlex } from '@components/common/CommonFlex';
import UserInfoSideBar from '@components/sideBar/UserInfoSideBar';

const AccountSettingPage: NextPage = () => {
  return (
    <SettingWrap>
      <SettingInnerBox>
        <SideProfileSettingBox>
          <UserInfoSideBar></UserInfoSideBar>
        </SideProfileSettingBox>
        <UserInfoSettingBox></UserInfoSettingBox>
      </SettingInnerBox>
    </SettingWrap>
  );
};

export default AccountSettingPage;

const SettingWrap = styled(AllCenterFlex)`
  width:100%;
  padding: 100px 30px 0;
`;
const SettingInnerBox = styled.div`
  width: 1200px;
  height: 500px;
`;

const UserInfoSettingBox = styled.div`
  flex-grow: 1;
`;
const SideProfileSettingBox = styled.div`
  width: 360px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;

`;
