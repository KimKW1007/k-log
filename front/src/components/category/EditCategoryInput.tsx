import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';

export interface CategoryInputProps {
  register: UseFormRegister<FieldValues>;
  defaultValue ?:string; 
  resgisterName :string; 
  sub ?: boolean
  setCategoryTitleValue ?: React.Dispatch<React.SetStateAction<string>>;
  setSubCategoryValue ?: React.Dispatch<React.SetStateAction<{
    categorySubTitle: string;
}[]>>

}


const EditCategoryInput = ({defaultValue, sub = false, register, resgisterName, setCategoryTitleValue , setSubCategoryValue} :CategoryInputProps) => {
  return (
    <EditInputBox>
      <EditInput {...register(resgisterName, { required: true ,
      onChange :(e)=>{
        sub?
        setSubCategoryValue!(prev => [...prev, {categorySubTitle : e.target.value}])
        :
        setCategoryTitleValue!(e.target.value)
      
      }
      })} defaultValue={defaultValue} placeholder='카테고리를 입력해주세요'></EditInput>
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