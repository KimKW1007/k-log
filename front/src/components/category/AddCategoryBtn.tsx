import React from 'react'
import styled, { keyframes } from 'styled-components';
const AddCategoryBtn = ({onClick} : {onClick: () => void}) => {
  return (
    <AddBtn onClick={onClick}>+ 새 카테고리 만들기</AddBtn>
  )
}

export default AddCategoryBtn
const AddBtn = styled.button`

`;