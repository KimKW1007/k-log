import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CategoryItems from './CategoryItems';
import Link from 'next/link';

export interface CategoryBackProps {
  id?: string;
  categoryTitle: string;
  subCategories: SubCategoryBackProps[];
  dndNumber: number;
}
export interface SubCategoryBackProps {
  id?: string;
  categorySubTitle: string;
  boards ?: any;
}
const CategoryList = ({ isOverHeader }: { isOverHeader: boolean }) => {
  const [allBoardLength, setAllBoardLength] = useState(0);
  return (
    <CategoryNav $isOverHeader={isOverHeader}>
      <CategoryListBox className='customScroll' $isOverHeader={isOverHeader}>
        <CategoryAllListLink href={'/category'} $isOverHeader={isOverHeader}>
          분류 전체보기<span> &#40; {allBoardLength} &#41;</span>
        </CategoryAllListLink>
        <CategoryItems setAllBoardLength={setAllBoardLength} isOverHeader={isOverHeader} />
      </CategoryListBox>
    </CategoryNav>
  );
};

export default CategoryList;
export const DropAni = keyframes`
  0%{
    margin-top: -4px;
    opacity: 0;
  }
  100%{
    margin-top: 4px;
    opacity: 1;
  }
`;

const CategoryNav = styled.nav<{ $isOverHeader?: boolean }>`
  position: absolute;
  z-index: 16;
  margin-top: 2px;
  animation: ${DropAni} 0.4s forwards;
  border-top: 4px solid ${({ theme }) => theme.color.err};

  ${({ $isOverHeader, theme }) =>
  $isOverHeader &&
  `
  border-top: 4px solid ${theme.color.success};
`}
  

`;

export const CategoryAllListLink = styled(Link)<{ $isOverHeader?: boolean }>`
  display: block;
  font-size: 14px;
  border-bottom: 1px solid #858585;
  padding: 10px 5px 8px;
  margin-bottom: 10px;
  &:hover {
    color: ${({ theme }) => theme.color.err};
  }
  ${({ $isOverHeader, theme }) =>
    $isOverHeader &&
    `
    color: #232323;
    &:hover{
      color: ${theme.color.success};
    }
  `}
`;

export const CategoryListBox = styled.div<{ $isOverHeader ?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 230px;
  max-height: 70vh;
  background: #292929;
  overflow-y:scroll;
  color: #fff;
  padding: 10px 15px 25px;
  transition: 0.4s ease-in-out;
  border: 2px solid #565656;
  border-radius: 0 0 20px 20px;
  &::-webkit-scrollbar-thumb {
    transition: background-color 0.4s ease-in-out;
  }
  &::-webkit-scrollbar-track {
    margin : 10px 0;
  }
  
  ${({ $isOverHeader, theme }) =>
    $isOverHeader &&
    `
    background: #fff;
    color:#232323;
    border: 2px solid ${theme.color.success};
    &::-webkit-scrollbar-thumb {
      background-color: #292929;
    }
  `}
  border-top: 0;

`;
