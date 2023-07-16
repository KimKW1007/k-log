import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import EditCategoryInput from './EditCategoryInput';
import EditSubCategoryItems from './EditSubCategoryItems';
import { UseFieldArrayRemove } from 'react-hook-form';




const EditCategoryItemBox = ({categoryIndex, remove} :{ categoryIndex: number; remove: UseFieldArrayRemove}) => {


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


const CategoryItemBox =styled.div`
  padding-bottom: 8px;
  margin-bottom: 5px;
  border-bottom: 2px solid #999;
`


const CategoryTitle = styled.div`
font-size: ${({ theme }) => theme.rem.p14};
padding: 0 10px;
`;
