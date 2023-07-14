import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { NextPage } from 'next';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import AccountEdit from '@components/accountEdit/AccountEdit';
import AccountCertificate from '@components/accountEdit/AccountCertificate';
import {ShieldLock} from "@styled-icons/bootstrap/ShieldLock"
import { FlexEmptyBox } from '@components/signup/signupForm';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import EditSideBar from '@components/accountEdit/EditSidbar/EditSideBarBox';
const AccountEditPage: NextPage = () => {
  const [ isCertificated, setIsCertificated ] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const [isMount, setIsMount] = useState(false);

  useEffect(()=>{
    setIsMount(true);
  },[])
  return (
    <EditWrap>
      <EditInnerBox>
        <SideProfileEditBox>
          {(isMount &&  isCertificated && currentUser?.id === 1) || <LockIconBox>
            <FlexEmptyBox/>
              <ShieldLock/>
            <FlexEmptyBox/>
          </LockIconBox>}
          {isMount && isCertificated && currentUser?.id === 1 && <EditSideBar></EditSideBar>}
        </SideProfileEditBox>
        <AccountEditArea>
          {isCertificated && <AccountEdit></AccountEdit>}
          {isCertificated || <AccountCertificate setIsCertificated={setIsCertificated}></AccountCertificate>}
        </AccountEditArea>
      </EditInnerBox>
    </EditWrap>
  );
};

export default AccountEditPage;

const EditWrap = styled(OnlyJustifyCenterFlex)`
  width:100%;
  padding: ${({theme}) => theme.rem.p100} ${({theme}) => theme.rem.p30};
  color:#232323;
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
  background:#fff;
`;

const LockIconBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  height:100%;
  svg{
    width: 50%;
    color:${({theme}) => theme.color.success};
  }
`
