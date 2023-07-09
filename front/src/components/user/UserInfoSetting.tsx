import React from 'react'
import styled from 'styled-components';
import UserInfoSettingInputsBox from './UserInfoSettingInputsBox';
import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';

const UserInfoSetting = () => {
  return (
    <SettingWrap>
      <SettingTitleBox>
        <h2>타이틀</h2>
      </SettingTitleBox>
      <SettingBox>
        <SettingInnerBox>
          <UserInfoSettingInputsBox></UserInfoSettingInputsBox>
        </SettingInnerBox>
      </SettingBox>
    </SettingWrap>
  )
}

export default UserInfoSetting

const SettingWrap = styled.div`
  width:100%;
`

const SettingTitleBox = styled.div`
  margin-bottom: ${({theme}) => theme.rem.p50};
  padding: 0 ${({theme}) => theme.rem.p50};
  h2{
    font-size :${({theme}) => theme.rem.p34};
  }
`

const SettingBox = styled.div`
  width:100%;
  padding: ${({theme}) => theme.rem.p60};
`
const SettingInnerBox = styled.div`
  width:100%;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p30};
`

