import React, { useState } from 'react';
import styled from 'styled-components';
import AccountEditBox from './AccountEditBox';
import { accountEditInputList } from '@utils/userInfoEdit';
import ChangePassword from './ChangePassword';

const AccountEditInputsBox = ({currentTab} : {currentTab :string}) => {
  return (
    <InputsWrap>
      <InputsBox>
      { currentTab === '개인정보변경' && accountEditInputList.map(({ name, title }) => (
          <AccountEditBox title={title} name={name}></AccountEditBox>
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
  width: 100%;
  padding: 40px 40px;
`;
