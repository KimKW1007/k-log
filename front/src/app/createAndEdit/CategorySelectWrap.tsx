import React, { useEffect, useRef, useState } from 'react';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { AllCenterFlex, OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { DropAni } from '@/src/components/category/CategoryList';
import useHandleClickOutside from '@/src/hooks/useHandleClickOutside';
import { CategoryText } from '@/src/components/category/CategoryBox';

interface CategorySelectWrapProps{
  currentSubCategory: string;
  setCurrentSubCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategorySelectWrap = ({currentSubCategory, setCurrentSubCategory}:CategorySelectWrapProps) => {
  const { getApi } = customApi('/category/getAllSubCategory');
  const { data } = useQuery(['getAllSubCategoryKey'], () => getApi());
  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(categoryRef, setIsCategoryOn);

  const onClickCategoryItem = (categorySubTitle : string) => ()=>{
    setIsCategoryOn(false)
    setCurrentSubCategory(categorySubTitle)
  }



  return (
    <CategorySelectArea>
      <CategorySelect ref={categoryRef}>
        <CurrentCategoryArea isFocus={isCategoryOn} onClick={() => setIsCategoryOn((prev) => !prev)}>
          <CategoryText>{currentSubCategory}</CategoryText>
          <ArrowBox>{isCategoryOn ? <ChevronUp /> : <ChevronDown />}</ArrowBox>
        </CurrentCategoryArea>
        {isCategoryOn && (
          <CategoryOptionsArea>
            <CategoryListBox>
              {data?.map(({categorySubTitle}: any) => (
                <CategoryItem key={categorySubTitle + 'categorySubTitle'} onClick={onClickCategoryItem(categorySubTitle)}>{categorySubTitle}</CategoryItem>
              ))}
            </CategoryListBox>
          </CategoryOptionsArea>
        )}
      </CategorySelect>
    </CategorySelectArea>
  );
};

export default CategorySelectWrap;

const CategorySelectArea = styled.div`
  padding: 100px 0 50px;
`;

const CategorySelect = styled.div`
  width: 300px;
  height: 50px;
  position: relative;
`;

const CurrentCategoryArea = styled.button<{isFocus : boolean;}>`
  position:relative;
  border: 1px solid ${({theme}) => theme.color.lightGrey};
  transition: .3s ease;
  width: 100%;
  height: 100%;
  background: #2f333b;
  color: #fff;
  cursor: pointer;
  ${({isFocus}) => isFocus && `border: 1px solid #fff;`}
`;
const ArrowBox = styled(AllCenterFlex)`
  position:absolute;
  right: 0;
  top: 0;
  z-index:2;
  width: 50px;
  height: 100%;
  svg {
    width: 20px;
  }
`;

const CategoryOptionsArea = styled.div`
  position: absolute;
  z-index: 16;
  width:100%;
  margin-top: 2px;
  animation: ${DropAni} 0.4s forwards;
  background: #2f333b;
`;

const CategoryListBox = styled.div`
  width:100%;
  padding: 10px ;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
`;

const CategoryItem = styled.button`
  display:block;
  width:100%;
  position: relative;
  overflow: hidden;
  color: #fff;
  background: transparent;
  font-size: 13px;
  word-break: keep-all;
  padding: 10px 20px;
  transition: 0.2s;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.lightGrey};
  }
  &:hover {
    background: ${({ theme }) => theme.color.success};;
  }
`;
