import React from 'react';
import styled from 'styled-components';
import { SettingInput, SettingInputArea, SettingInputInnerArea, SettingInputTitleBox } from './UserInfoSettingBox';

const ChangePasswordBox = () => {
  const changePasswordText = ['새 비밀번호', '새 비밀번호 확인'];

  return (
    <>
      {changePasswordText.map((title) => (
        <SettingInputArea>
          <SettingInputInnerArea>
            <SettingInputTitleBox isPassword>
              <h4>{title}</h4>
            </SettingInputTitleBox>
            <SettingInput type="text" />
          </SettingInputInnerArea>
        </SettingInputArea>
      ))}
    </>
  );
};

export default ChangePasswordBox;
