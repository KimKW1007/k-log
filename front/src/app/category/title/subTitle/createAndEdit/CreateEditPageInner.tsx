'use client';
import React, { useEffect, useState } from 'react';
import { BoardTitleBox } from '@/src/components/board/BoardWrapComp';
import BoardForm from '@/src/components/board/subTitlePage/BoardForm';
import styled from 'styled-components';
import night_BG from '@/src/assets/images/dark_night.jpg';


interface CreateEditPageInnerProps{
  title:  string;
  subTitle:  string;
  id ?: string;
  isEdit ?: boolean;
}


const CreateEditPageInner = ({ title, subTitle, id, isEdit = false } : CreateEditPageInnerProps) => {
  const [currentTitle, setCurrentTitle] = useState<string[]>([]);

  useEffect(() => {
    setCurrentTitle([title, subTitle]);
  }, [title, subTitle]);
  return (
    <CreateWrap>
      <CreateContainer>
        <BoardTitleBox>{currentTitle && currentTitle.map((ele, idx) => <p key={ele + 'salt' + idx}>{ele}</p>)}</BoardTitleBox>
        <BoardForm subTitle={subTitle} id={isEdit ? id : undefined} isEdit={isEdit} />
      </CreateContainer>
    </CreateWrap>
  )
}

export default CreateEditPageInner

export const CreateWrap = styled.div`
  padding: 0 50px;
  background: linear-gradient(to right, rgba(11, 11, 22, 0.8) 100%, rgba(11, 11, 22, 0.8) 100%), url(${night_BG.src}) no-repeat center center/cover fixed;
  @media (max-width: 1200px) {
    padding: 0;
  }
`;
export const CreateContainer = styled.div`
  width: 100%;
  max-width: 1030px;
  padding: 0 50px 150px;
  margin: 0 auto;
  background: #23262d;
  @media (max-width: 937px) {
    padding: 0 10px 150px;
  }
`;
