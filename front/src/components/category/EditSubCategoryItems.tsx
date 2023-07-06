import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput from './EditCategoryInput';

const EditSubCategoryItems = ({ subCategories }: Omit<CategoryBackProps,"id" | "categoryTitle">) => {
  const [isClickAddBtn , setIsClickAddBtn] = useState(false);
  return (
    <CategorySubItemBox>
      {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps) => (
        <CategoryItem>
          <EditCategoryInput defaultValue={categorySubTitle}  />
        </CategoryItem>
      ))}
      {isClickAddBtn ? <EditCategoryInput />:<AddCategoryBtn onClick={()=>{setIsClickAddBtn(true)}}/>}
    </CategorySubItemBox>
  );
};

export default EditSubCategoryItems;

const CategorySubItemBox = styled.div`
  margin-left: 20px;
`;
const CategoryItem = styled.dd`
  position: relative;
  margin-bottom: 2px;
`;
