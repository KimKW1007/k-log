import React, { useState } from 'react';
import styled from 'styled-components';
import AccountEditBox from './AccountEditBox';
import { accountEditInputList } from '@utils/userInfoEdit';
import ChangePassword from './ChangePassword';
import EditSideBar from './EditSidbar/EditSideBarBox';

const AccountEditInputsBox = ({currentTab } : {currentTab :string;}) => {
  return (
    <InputsWrap>
      <InputsBox>
        {currentTab === '카테고리' && <EditSideBar></EditSideBar>}
        {currentTab === '개인정보변경' && accountEditInputList.map(({ name, title }, idx) => (
          <AccountEditBox title={title} key={idx + 'salt' + title} name={name} ></AccountEditBox>
        ))}
        {currentTab === '비밀번호변경' && <ChangePassword></ChangePassword>}
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
  @media(max-width: 1300px){
    padding: 40px 20px;
  }
  @media(max-width: 722px){
    padding: 40px 0;
  }
`;
