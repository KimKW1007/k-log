import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput, { CategoryInputProps } from './EditCategoryInput';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';
import { useFieldArray, useFormContext } from 'react-hook-form';

/* interface SubCategoryProps extends CategoryInputProps, Omit<CategoryBackProps, 'id' | 'categoryTitle'> {
  categoryTitle: string;
  categoryTitleIdx: number;

}

const EditSubCategoryItems = ({ subCategories,  categoryTitle, idx, categoryTitleIdx }: SubCategoryProps) => {
  const [isClickAddBtn, setIsClickAddBtn] = useState(false);
  const [currentData, setCurrentDate] = useRecoilState(currentCategoryData);
  const [subCategoryValue, setSubCategoryValue] = useState<{ categorySubTitle: string }[]>([]);

  const addSubCategory = () => {
    let findIdx = currentData.findIndex((v, i) => i === categoryTitleIdx);
    const filtered = currentData[findIdx].subCategories.filter((x: { categorySubTitle: string; }) => x.categorySubTitle === '')
    if(filtered.length >= 1){
      alert("빈 카테고리가 있습니다.")
      return
    }
    let copiedItem = [...currentData];
    copiedItem[findIdx] = {...copiedItem[findIdx], subCategories : [...copiedItem[findIdx].subCategories,{categorySubTitle : ""}]}
    setCurrentDate(copiedItem)
  };

  return (
    <CategorySubItemBox>
      {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps, idx: number) => (
          <CategoryItem>
            <EditCategoryInput sub idx={idx} categoryTitleIdx={categoryTitleIdx} categoryTitle={categoryTitle} categorySubTitle={categorySubTitle} defaultValue={categorySubTitle} />
          </CategoryItem>
        ))}
      <AddCategoryBtn
        onClick={() => {
          addSubCategory();
        }}></AddCategoryBtn>
    </CategorySubItemBox>
  );
};

export default EditSubCategoryItems; */
interface SubCategoryProps extends CategoryInputProps, Omit<CategoryBackProps, 'id' | 'categoryTitle'> {
  categoryTitle: string;
  categoryTitleIdx: number;
}

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
  margin: 10px 0 2px;
`;
