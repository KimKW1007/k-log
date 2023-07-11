import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { NextPage } from 'next';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import UserInfoSideBar from '@components/sideBar/UserInfoSideBar';
import AccountEdit from '@components/accountEdit/AccountEdit';

const AccountEditPage: NextPage = () => {
  return (
    <EditWrap>
      <EditInnerBox>
        <SideProfileEditBox>
          <UserInfoSideBar></UserInfoSideBar>
        </SideProfileEditBox>
        <AccountEditArea>
          <AccountEdit></AccountEdit>
        </AccountEditArea>
      </EditInnerBox>
    </EditWrap>
  );
};

export default AccountEditPage;

const EditWrap = styled(OnlyJustifyCenterFlex)`
  width:100%;
  padding: ${({theme}) => theme.rem.p100} ${({theme}) => theme.rem.p30};
`;
const EditInnerBox = styled.div`
  width: 1300px;
  display:flex;
  column-gap: ${({theme}) => theme.rem.p30};
`;

const AccountEditArea = styled.div`
  position:relative;
  flex-grow: 1;

`;
const SideProfileEditBox = styled.div`
  width: 360px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p20};
`;
