import React from 'react';
import styled from 'styled-components';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput from './EditCategoryInput';
import { useFieldArray, useFormContext } from 'react-hook-form';

const EditSubCategoryItems = ({ categoryIndex }: { categoryIndex: number }) => {
  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: `category.${categoryIndex}.subCategories`
  });
  return (
    <CategorySubItemBox>
      {fields.map((field, index) => (
        <CategoryItem key={field.id}>
          <EditCategoryInput remove={remove} sub key={field.id} subCategoriesIndex={index} name={`category.${categoryIndex}.subCategories.${index}.categorySubTitle`} />
        </CategoryItem>
      ))}
      <AddCategoryBtn
        onClick={() => {
          append({categorySubTitle: ""});
        }}></AddCategoryBtn>
    </CategorySubItemBox>
  );
};

export default EditSubCategoryItems;

const CategorySubItemBox = styled.div`
  margin-left: 20px;
`;
const CategoryItem = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.rem.p10} 0 2px;
`;
