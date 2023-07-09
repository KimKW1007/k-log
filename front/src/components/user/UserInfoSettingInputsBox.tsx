import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfoSettingBox from './UserInfoSettingBox';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import { FormProvider, useForm } from 'react-hook-form';
import { userInfoSettingInputList } from '@utils/userInfoSetting';

const UserInfoSettingInputsBox = () => {

  return (
    <InputsWrap>
      <InputsBox>
        {userInfoSettingInputList.map(({ name, title }) => (
            <UserInfoSettingBox title={title} name={name} ></UserInfoSettingBox>
        ))}
      </InputsBox>
    </InputsWrap>
  );
};

export default UserInfoSettingInputsBox;


const InputsWrap = styled.div`
  width: 100%;
`;

const InputsBox = styled.div`
  width: 100%;
  padding: 40px 40px;
`;
