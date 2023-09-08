'use client';
import React, { useState } from 'react';
import BoardForm from '@/src/components/board/subTitlePage/BoardForm';
import styled from 'styled-components';
import night_BG from '@/src/assets/images/dark_night.jpg';
import CategoryCheckList from './CategorySelectWrap';



interface CreateEditPageInnerProps{
  id ?: string;
  isEdit ?: boolean;
}


const CreateEditPageInner = ({ id, isEdit = false } : CreateEditPageInnerProps) => {
  const [currentSubCategory , setCurrentSubCategory] = useState('카테고리 선택');
  return (
    <CreateWrap>
      <CreateContainer>
        <CategoryCheckList currentSubCategory={currentSubCategory} setCurrentSubCategory={setCurrentSubCategory} />
        <BoardForm subTitle={currentSubCategory} setCurrentSubCategory={setCurrentSubCategory} id={isEdit ? id : undefined} isEdit={isEdit} />
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
