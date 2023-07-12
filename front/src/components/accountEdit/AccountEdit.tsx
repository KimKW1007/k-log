import React, { useState } from 'react'
import styled from 'styled-components';
import AccountEditInputsBox from './AccountEditInputsBox';
import { accountEditTabList } from '@utils/accountEditTabList';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';

const AccountEdit = () => {
  const [currentTab, setCurrentTab] = useState("개인정보변경");
  const onClickTab =(title : string) => ()=>{
    setCurrentTab(title)
  }
  return (
    <>
    <TabBox>
      {accountEditTabList.map((title)=>(
        <Tab onClick={onClickTab(title)} isCurrent={title === currentTab}>
          {title}
        </Tab>
      ))}
    </TabBox>
    <EditAreaBox>
      <EditTitleBox>
        <h2>{currentTab}</h2>
      </EditTitleBox>
      <EditBox>
        <EditInnerBox>
          <AccountEditInputsBox currentTab={currentTab}></AccountEditInputsBox>
        </EditInnerBox>
      </EditBox>
    </EditAreaBox>
    </>
  )
}

export default AccountEdit

const TabBox = styled(OnlyAlignCenterFlex)`
  position: absolute;
  z-index: 2;
  left: 100%;
  top: 30px;
  flex-direction: column;
`

const Tab = styled.button<{isCurrent : boolean;}>`
  font-size: 16px;
  padding: 50px 25px 50px 35px;
  font-weight: 900;
  border-radius: 0 20px 20px 0;
  background: #f5f5f5;
  color: #bbb;
  border-bottom: 1px solid rgba(0,0,0,.2);
  box-shadow: 5px 12px 5px 3px rgba(0,0,0,.2);
  transition: 0.3s;
  writing-mode: vertical-lr;
  transform :translateX(-20px);
  ${({isCurrent}) => isCurrent && `
    background: #232323;
    color: #e5e5e5;
    transform :translateX(0px);
  `}
  `

const EditAreaBox = styled.div`
  position:relative;
  z-index: 3;
  width:100%;
  border : 1px solid #DDE6ED;
  background: #fff;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p60} ${({theme}) => theme.rem.p20};
`

export const EditTitleBox = styled.div`
  margin-bottom: ${({theme}) => theme.rem.p50};
  padding: 0 ${({theme}) => theme.rem.p50};
  h2{
    font-size :${({theme}) => theme.rem.p34};
  }
`

const EditBox = styled.div`
  width:100%;
  padding: ${({theme}) => theme.rem.p60};
`
const EditInnerBox = styled.div`
  width:100%;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: ${({theme}) => theme.rem.p30};
`

