import React from 'react';
import styled from 'styled-components';
import EditCategoryInput from './EditCategoryInput';
import EditSubCategoryItems from './EditSubCategoryItems';
import { UseFieldArrayRemove } from 'react-hook-form';

const EditCategoryItemBox = ({ categoryIndex, remove }: { categoryIndex: number; remove: UseFieldArrayRemove }) => {
  return (
    <CategoryItemBox>
      <CategoryTitle>
        <MoveAttraction>
          <span></span>
          <span></span>
          <span></span>
        </MoveAttraction>
        <EditCategoryInput categoryIndex={categoryIndex} name={`category.${categoryIndex}.categoryTitle`} remove={remove} />
      </CategoryTitle>
      <EditSubCategoryItems categoryIndex={categoryIndex}></EditSubCategoryItems>
    </CategoryItemBox>
  );
};

export default EditCategoryItemBox;

const CategoryTitle = styled.div`
  font-size: 16px;
`;

export const MoveAttraction = styled.div`
  margin-bottom: 10px;
  span {
    display: block;
    width: 100%;
    height: 2px;
    transition: 0.2s;
    background: #999999;
    & + span {
      margin-top: 2px;
    }
  }
`;

const CategoryItemBox = styled.div``;
