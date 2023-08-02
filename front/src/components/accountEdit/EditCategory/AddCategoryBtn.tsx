import React from 'react'
import styled, { keyframes } from 'styled-components';
const AddCategoryBtn = ({onClick} : {onClick: () => void}) => {
  return (
    <AddBtn type="button" onClick={onClick}>새 카테고리 만들기</AddBtn>
  )
}

export default AddCategoryBtn
const AddBtn = styled.button`
  width:100%;
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 6px;
  background: #f2f2f2;
  color: #acacac;
  transition: .2s;
  &:hover{
    background: #e5e5e5;
    color: #555;
  }
`;