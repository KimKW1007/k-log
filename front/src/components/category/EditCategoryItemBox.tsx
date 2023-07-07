import React, { useState } from 'react'
import { CategoryBackProps } from './CategoryList'
import styled, { keyframes } from 'styled-components';
import EditCategoryInput from './EditCategoryInput';
import EditSubCategoryItems from './EditSubCategoryItems';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';

interface CategoryItemProps extends  Omit<CategoryBackProps , 'id'>{
  idx : number;
  id ?:number;

}

const EditCategoryItemBox = ({ categoryTitle, subCategories, idx, id }: CategoryItemProps) => {
  const [currentData , setCurrentDate] = useRecoilState(currentCategoryData);
  const [categoryTitleValue , setCategoryTitleValue] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  });
  const onSubmit = (data: any) => {
    console.log({data})
  };
  console.log(typeof categoryTitle)

  return (
    <CategoryForm onSubmit={handleSubmit(onSubmit)}>
      <CategoryItemBox>
        <CategoryTitle>
          <EditCategoryInput defaultValue={categoryTitle} register={register} resgisterName={'categoryTitle'} setCategoryTitleValue={setCategoryTitleValue} />
        </CategoryTitle>
        <EditSubCategoryItems subCategories={subCategories} register={register} resgisterName={'categorySubTitle'} categoryTitle={categoryTitle!} idx={idx} ></EditSubCategoryItems>
      </CategoryItemBox>
    </CategoryForm>
  )
}

export default EditCategoryItemBox

const CategoryForm = styled.form`

`


const CategoryItemBox =styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
`


const CategoryTitle = styled.dt`
font-size: ${({ theme }) => theme.rem.p14};
margin-bottom: 2px;

`;

const CategoryItem = styled.dd`
position: relative;
margin-bottom: 2px;

`;