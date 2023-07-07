import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput, { CategoryInputProps } from './EditCategoryInput';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';

interface SubCategoryProps extends CategoryInputProps, Omit<CategoryBackProps, 'id' | 'categoryTitle'> {
  categoryTitle: string;
  idx: number;

}

const EditSubCategoryItems = ({ subCategories, register, resgisterName, categoryTitle, idx }: SubCategoryProps) => {
  const [isClickAddBtn, setIsClickAddBtn] = useState(false);
  const [currentData, setCurrentDate] = useRecoilState(currentCategoryData);
  const [subCategoryValue, setSubCategoryValue] = useState<{ categorySubTitle: string }[]>([]);

  const addSubCategory = () => {
    let findIdx = currentData.findIndex(i => i.categoryTitle === categoryTitle);
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
            <EditCategoryInput sub register={register} defaultValue={categorySubTitle} resgisterName={resgisterName} setSubCategoryValue={setSubCategoryValue} />
          </CategoryItem>
        ))}
      <AddCategoryBtn
        onClick={() => {
          addSubCategory();
        }}></AddCategoryBtn>
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
