import React from 'react';
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
}
const CategoryList = ({ isOverHeader }: { isOverHeader: boolean }) => {
  return (
    <CategoryNav>
      <CategoryListBox className='customScroll' $isOverHeader={isOverHeader}>
        <CategoryAllListLink href={'/category'} $isOverHeader={isOverHeader}>
          분류 전체보기
        </CategoryAllListLink>
        <CategoryItems isOverHeader={isOverHeader} />
      </CategoryListBox>
    </CategoryNav>
  );
};

export default CategoryList;
const DropAni = keyframes`
  0%{
    margin-top: -4px;
    opacity: 0;
  }
  100%{
    margin-top: 4px;
    opacity: 1;
  }
`;

const CategoryNav = styled.nav`
  position: absolute;
  margin-top: 2px;
  animation: ${DropAni} 0.4s forwards;
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

const CategoryListBox = styled.div<{ $isOverHeader: boolean }>`
  display: flex;
  flex-direction: column;
  width: 230px;
  max-height: 70vh;
  background: #292929;
  overflow-y:scroll;
  color: #fff;
  padding: 10px 15px 25px;
  transition: 0.4s ease-in-out;
  border: 1px solid #565656;
  border-top: 4px solid ${({ theme }) => theme.color.err};
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
    border-top: 4px solid ${theme.color.success};
    &::-webkit-scrollbar-thumb {
      background-color: #292929;
    }
  `}
`;
