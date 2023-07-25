import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import CategoryItems from './CategoryItems';
import Link from 'next/link';

export interface CategoryBackProps {
  id ?: number;
  categoryTitle: string;
  subCategories: SubCategoryBackProps[];
}
export  interface SubCategoryBackProps {
  id ?: number;
  categorySubTitle: string;
}
const CategoryList = ({isOverHeader} : {isOverHeader :boolean}) => {
  return (
    <CategoryNav>
      <CategoryListBox $isOverHeader={isOverHeader}>
        <CategoryAllListLink href={'/category'} $isOverHeader={isOverHeader}>분류 전체보기</CategoryAllListLink>
        <CategoryItems isOverHeader={isOverHeader}/>
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

const CategoryAllListLink = styled(Link)<{$isOverHeader :boolean}>`
  display: block;
  font-size: ${({ theme }) => theme.rem.p14};
  border-bottom: 1px solid #858585;
  padding: 10px 5px 8px;
  margin-bottom: ${({ theme }) => theme.rem.p10};
  &:hover{
    color: ${({theme}) => theme.color.err};
  }
  ${({$isOverHeader, theme}) => $isOverHeader && `
    color: #232323;
    &:hover{
      color: ${theme.color.success};
    }
  `}
`

const CategoryListBox = styled.div<{$isOverHeader : boolean}>`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  background: #292929;
  color: #fff;
  padding: 10px 15px 25px;
  transition: 0.4s ease-in-out;
  border: 1px solid #565656;
  border-top: 4px solid ${({ theme }) => theme.color.err};
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  ${({$isOverHeader, theme}) => $isOverHeader && `
    background: #fff;
    color:#232323;
    border-top: 4px solid ${theme.color.success};
  `}
`;
