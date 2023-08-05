import React, { useState } from 'react';
import styled from 'styled-components';
import AccountEditBox from './AccountEditBox';
import { accountEditInputList } from '@utils/userInfoEdit';
import ChangePassword from './ChangePassword';
import EditSideBar from './EditSidbar/EditSideBarBox';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import Withdraw from './Withdraw';

const AccountEditInputsBox = ({currentTab } : {currentTab :string;}) => {
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);

  return (
    <InputsWrap>
      <InputsBox> 
        {currentTab === '카테고리' && <EditSideBar isAdmin={currentUser?.id === 1}></EditSideBar>}
        {currentTab === '개인정보변경' && accountEditInputList.map(({ name, title }, idx) => (
          <AccountEditBox title={title} key={idx + 'salt' + title} name={name} ></AccountEditBox>
        ))}
        {currentTab === '비밀번호변경' && <ChangePassword></ChangePassword>}
        {currentTab === '회원탈퇴' && <Withdraw></Withdraw>}
      </InputsBox>
    </InputsWrap>
  );
};

export default AccountEditInputsBox;

const InputsWrap = styled.div`
  width: 100%;
`;

const InputsBox = styled.div`
  position:relative;
  width: 100%;
  padding: 40px;
  @media(max-width: 1080px){
    padding: 40px 0;
  }
`;
