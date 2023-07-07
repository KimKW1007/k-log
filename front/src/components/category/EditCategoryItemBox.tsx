import React, { useState } from 'react'
import { CategoryBackProps } from './CategoryList'
import styled, { keyframes } from 'styled-components';
import EditCategoryInput from './EditCategoryInput';
import EditSubCategoryItems from './EditSubCategoryItems';
import { UseFieldArrayRemove, useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';
/* interface CategoryItemProps extends  Omit<CategoryBackProps , 'id'>{
  idx : number;
  id ?:number;

} */



const EditCategoryItemBox = ({categoryIndex, remove} :{ categoryIndex: number; remove: UseFieldArrayRemove}) => {
  const [currentData , setCurrentDate] = useRecoilState(currentCategoryData);
  const { control } = useFormContext();


  return (
      <CategoryItemBox>
        <CategoryTitle>
          <EditCategoryInput categoryIndex={categoryIndex} name={`category.${categoryIndex}.categoryTitle`} remove={remove} />
        </CategoryTitle>
        <EditSubCategoryItems categoryIndex={categoryIndex} ></EditSubCategoryItems>
      </CategoryItemBox>
  )
}

export default EditCategoryItemBox
/* 
const EditCategoryItemBox = ({ categoryTitle, subCategories, idx, id }: CategoryItemProps) => {
  const [currentData , setCurrentDate] = useRecoilState(currentCategoryData);


  return (
      <CategoryItemBox>
        <CategoryTitle>
          <EditCategoryInput idx={idx} defaultValue={categoryTitle} categoryTitle={categoryTitle}  />
        </CategoryTitle>
        <EditSubCategoryItems subCategories={subCategories} categoryTitle={categoryTitle!} categoryTitleIdx={idx} ></EditSubCategoryItems>
      </CategoryItemBox>
  )
}

export default EditCategoryItemBox */




const CategoryItemBox =styled.div`
  padding-bottom: 8px;
  margin-bottom: 5px;
  border-bottom: 2px solid #999;
`


const CategoryTitle = styled.div`
font-size: ${({ theme }) => theme.rem.p14};
padding: 0 10px;
`;
