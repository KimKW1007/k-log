import React from 'react';
import styled from 'styled-components';
import AccountEditBox from './AccountEditBox';
import { accountEditInputList } from '@/src/utils/userInfoEdit';
import ChangePassword from './ChangePassword';
import EditSideBar from './EditSidbar/EditSideBarBox';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import Withdraw from './Withdraw';
import EditProject from './banner/EditProject';
import EditBanner from './banner/EditBanner';

const AccountEditInputsBox = ({ currentTab, currentBannerTitle }: { [key: string]: string }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);

  return (
    <InputsWrap>
      <InputsBox isMainBanner={currentTab === '배너설정'}>
        {currentTab === '카테고리' && <EditSideBar isAdmin={Boolean(currentUser?.isAdmin)} />}
        {currentTab === '개인정보변경' && accountEditInputList.map(({ name, title }, idx) => <AccountEditBox title={title} key={idx + 'accountEditInputList' + title} name={name} />)}
        {currentTab === '비밀번호변경' && <ChangePassword />}
        {currentTab === '회원탈퇴' && <Withdraw />}
        {currentTab === '배너설정' && <>{currentBannerTitle === '메인배너' ? <EditBanner></EditBanner> : <EditProject></EditProject>}</>}
      </InputsBox>
    </InputsWrap>
  );
};

export default AccountEditInputsBox;

const InputsWrap = styled.div`
  width: 100%;
`;

const InputsBox = styled.div<{ isMainBanner?: boolean }>`
  position: relative;
  width: 100%;
  padding: 40px;
  ${({ isMainBanner }) =>
    isMainBanner &&
    `
    padding: 40px 0;
  `}
  @media(max-width: 1080px) {
    padding: 40px 0;
  }
`;
