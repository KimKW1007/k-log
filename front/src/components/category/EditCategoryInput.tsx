import React from 'react'
import styled, { keyframes } from 'styled-components';

const EditCategoryInput = ({defaultValue, sub = false} :{ defaultValue ?:string, sub ?: boolean}) => {
  return (
    <EditInputBox>
      <EditInput defaultValue={defaultValue} placeholder='카테고리를 입력해주세요'></EditInput>
    </EditInputBox>
  )
}

export default EditCategoryInput

const EditInputBox = styled.div`
  
`


const EditInput = styled.input`
  width:100%;
  line-height: 24px;
`