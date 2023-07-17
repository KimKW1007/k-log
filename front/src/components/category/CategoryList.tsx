import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import CategoryItems from './CategoryItems';

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
      <CategoryListBox isOverHeader={isOverHeader}>
        <h3>카테고리 목록</h3>
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

const CategoryListBox = styled.div<{isOverHeader : boolean}>`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  background: #292929;
  color: #fff;
  padding: ${({ theme }) => theme.rem.p20} 0.938rem 1.563rem;
  transition: 0.4s ease-in-out;
  border: 1px solid #565656;
  border-top: 4px solid ${({ theme }) => theme.color.err};
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  h3 {
    font-size: ${({ theme }) => theme.rem.p14};
    border-bottom: 1px solid #858585;
    padding: 0 0.313rem .5rem;
    margin-bottom: ${({ theme }) => theme.rem.p10};
    pointer-events: none;
  }
  ${({isOverHeader, theme}) => isOverHeader && `
    background: #fff;
    color:#232323;
    border-top: 4px solid ${theme.color.success};
  `}
`;
