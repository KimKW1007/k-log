import { AllCenterFlex, OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import FindForm from '@components/find/FindForm';
import type { NextPage } from 'next';
import React, { MouseEvent, useEffect, useState } from 'react';
import { inputResetBoolean } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { ListTypes, findList, tabList } from '@utils/mapList';

const FindPage: NextPage = () => {
  // 텝 관련
  const [isOnPasswordTab, setIsOnPasswordTab] = useState(false);
  const [textById, setTextById] = useState<ListTypes>();

  const [resetState, setResetState] = useRecoilState(inputResetBoolean);

  const onClickChangeTab = (id: string) => () => {
    id === 'tabId' ? setIsOnPasswordTab(false) : setIsOnPasswordTab(true);
    setTextById(findList.find((x) => x.id === id));
    setResetState((prev) => !prev);
  };
  useEffect(() => {
    setTextById(findList[0]);
  }, []);

  return (
    <FindPageWrap>
      <FindInnerBox>
        <SelectTabBox>
          {tabList.map(({ id, text }, idx: number) => (
            <FindTabBox id={id} key={id}>
              <FindBtn onClick={onClickChangeTab(id)} currentId={id} textById={textById?.id}>
                {text} 찾기
              </FindBtn>
            </FindTabBox>
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

const FindPageWrap = styled.div`
  width: 33rem;
  height: 100%;
  margin : 0 auto;
`;

const FindInnerBox = styled.div`
width: 100%; 
`;

const SelectTabBox = styled.div`
  width: 100%;
  display: flex;
`;

const FindBtn = styled.button<{ currentId: string; textById?: string }>`
  width: 100%;
  padding: 16px 0;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid transparent;
  background: #fff;
  transform: scale(1);
  transition: 0.3s;
  ${({ currentId, textById }) =>
    currentId !== textById &&`
      transform: scale(0.99);
      background: #232323;
      color: #bbb;
      border-bottom: 1px solid #b5b5b5;
    `}
`;

const FindTabBox = styled.div`
  flex: 1;
`;

const FormBox = styled.div`
  height: 500px;
  padding: ${({ theme }) => theme.rem.p50} ${({ theme }) => theme.rem.p40} ${({ theme }) => theme.rem.p60};
  background: #fefefe;
  border: 1px solid #e5e5e5;
  border-top: 0;
`;
