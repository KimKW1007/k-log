import React, { useEffect, useState } from 'react';
import styled, { keyframes,css } from 'styled-components';
import type { GetServerSideProps, NextPage } from 'next';
import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import AccountEdit from '@components/accountEdit/AccountEdit';
import AccountCertificate from '@components/accountEdit/AccountCertificate';
import {ShieldLock} from "@styled-icons/bootstrap/ShieldLock"
import { FlexEmptyBox } from '@components/signup/signupForm';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import EditSideBar from '@components/accountEdit/EditSidbar/EditSideBarBox';
import useIsMount from 'src/hooks/useIsMount';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import LockIcon from '@components/accountEdit/LockIcon';


const AccountEditPage: NextPage = () => {
  const [ isCertificated, setIsCertificated ] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const {isMount} = useIsMount();
  const isEnter = isMount &&  isCertificated ;
  const [currentTab, setCurrentTab] = useState("");
  const [isForward, setIsForward] = useState(false);
  const [isDisappear, setIsDisappear] = useState(false);
  const handleResize = () => {
    if(window.innerWidth <= 980){
      setIsDisappear(true)
    }else{
      setIsDisappear(false)
    }
    

  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    } else {
        return () => window.removeEventListener("resize", () => {});
    }
}, []);


useEffect(()=>{
  if(isDisappear){
    setIsForward(true);
  }
  if(isDisappear && (currentTab === '' || currentTab === '배너설정') ){
    setCurrentTab("카테고리")
  }
  if(!isDisappear && currentTab === '카테고리'){
    setIsForward(false)
    setCurrentTab("개인정보변경")
  }
  if(!isDisappear){
    setCurrentTab("개인정보변경")
  }
},[isDisappear])

  return (
    <EditWrap>
      <EditInnerBox >
        {isDisappear || <SideProfileEditBox isEnter={!isEnter} isForward={isForward} onClick={()=> (isCertificated && !isDisappear) && setIsForward(false)}>
          {(isEnter) || <LockIcon/>}
          {isEnter && <EditSideBar isAdmin={currentUser?.id === 1}></EditSideBar>}
        </SideProfileEditBox>}
        <AccountEditArea isCertificated={isCertificated} isForward={isForward} onClick={()=> isCertificated && !isDisappear && setIsForward(true)}>
          {isCertificated && <AccountEdit isForward={isForward} isDisappear={isDisappear} currentTab={currentTab} setCurrentTab={setCurrentTab}  ></AccountEdit>}
          {isCertificated || <AccountCertificate setIsCertificated={setIsCertificated} ></AccountCertificate>}
        </AccountEditArea>
      </EditInnerBox>
    </EditWrap>
  );
};
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  return {
    props : {}
  }
});
export default AccountEditPage;

const EditWrap = styled(OnlyJustifyCenterFlex)`
  width:100%;
  padding: 100px 30px;
  color:#232323;
  @media(max-width: 980px){
    padding: 0 0 100px;
    background: #fff;
  }
`;
const EditInnerBox = styled.div`
  position: relative;
  max-width: 1300px;
  width:100%;
  display:flex;
  column-gap: 30px;

 

`;

const AccountEditArea = styled.div<{isCertificated : boolean; isForward :boolean; }>`
  position:relative;
  flex-grow: 1;
  ${({isCertificated, isForward}) => isCertificated  && css`
    @media(max-width: 1500px){
      position:absolute;
      z-index : 1;
      right: 73px;
      width: 910px;
      &:after{
        content: '';
        display:block;
        position :absolute;
        z-index :4;
        left: 0;
        top: 0;
        width: 100%;
        height:100%;
        background : rgba(0,0,0,.4);
        border-radius: 30px;
        cursor: pointer;
      }

      ${isForward && `
        z-index : 3;
        &:after{
          display:none;
        }
      `}
    }
    @media(max-width: 1150px){
      width: 79.1304vw;
    }
    @media(max-width: 1050px){
      width: 79.1304vw;
    }
    @media(max-width: 980px){
      position:relative;
      right: auto;
      &:after{
        border-radius: 0;
      }
    }
  ` }
`;
const SideProfileEditBox = styled.div<{isEnter :boolean; isForward : boolean;}>`
  position:relative;
  z-index : 2;
  flex-shrink : 0;
  width: 360px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p20};
  background:#fff;
  ${({isEnter, isForward}) => isEnter ? css`
    @media(max-width: 1200px){
      display:none;
    }
  ` : css`
    @media(max-width: 1500px){
      ${isForward&&`
        cursor: pointer;
        &:after{
          content: '';
          display:block;
          position :absolute;
          z-index :4;
          left: 0;
          top: 0;
          width: 100%;
          height:100%;
          background : rgba(0,0,0,.4);
          border-radius: 30px;
        }
      `}
    }
  
  
  `}
  @media(max-width: 980px){
    display:none;
  }
  
`;

