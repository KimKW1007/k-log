import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import FindForm from '@components/find/FindForm';
import type { NextPage } from 'next';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListTypes, findList, tabList } from 'utils/mapList';

const FindPage: NextPage = () => {
  // 텝 관련
  const [isOnPasswordTab, setIsOnPasswordTab] = useState(false);
  const [textById, setTextById] = useState<ListTypes>();

  const onClickChangeTab=(id : string)=>()=>{
    id === "tabId" ? setIsOnPasswordTab(false) : setIsOnPasswordTab(true)
    setTextById(findList.find(x => x.id === id))
  }
  useEffect(()=>{
    setTextById(findList[0])
  },[])

  return (
    <FindPageWrap>
      <FindInnerBox>
        <SelectTabBox>
          {tabList.map(({id, text}) =>(
            <FindTabBox id={id}><FindBtn onClick={onClickChangeTab(id)}>{text} 찾기</FindBtn></FindTabBox>
          ))}
        </SelectTabBox>
        <FormBox>
          <FindForm isOnPasswordTab={isOnPasswordTab} textById={textById}></FindForm>
        </FormBox>
      </FindInnerBox>
    </FindPageWrap>
  );
};

export default FindPage;

const FindPageWrap = styled(AllCenterFlex)`
  width: 100%;
  height: 100%;
`;

const FindInnerBox = styled.div`
  width: 33rem;
  border: 1px solid #000;
`;

const SelectTabBox = styled.div`
  width:100%;
  display:flex;
`;

const FindTabBox = styled.div`
  flex:1;
  &+&{
    border-left : 1px solid #000;
  }
`

const FindBtn = styled.button`
  width:100%;
  padding: 16px 0;
  font-weight:bold;
  font-size :18px;
`

const FormBox =styled.div`
height: 500px;
  padding:${({theme})=>theme.rem.p50} ${({theme})=>theme.rem.p40} ${({theme})=>theme.rem.p60};
  background: #fefefe;  
`
