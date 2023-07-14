import React from 'react';
import styled, { keyframes } from 'styled-components';
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
const CategoryList = () => {

  return (
    <CategoryNav>
      <CategoryListBox>
        <h3>카테고리 목록</h3>
        <CategoryItems/>
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
  border: 1px solid #565656;
  margin-top: 2px;
  animation: ${DropAni} 0.4s forwards;
  border-top: 4px solid ${({ theme }) => theme.color.err};
  border-radius: 0 0 20px 20px;
  overflow: hidden;
`;

const CategoryListBox = styled.dl`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  background: #292929;
  padding: ${({ theme }) => theme.rem.p20} 0.938rem 1.563rem;
  color: #fff;
  h3 {
    font-size: ${({ theme }) => theme.rem.p14};
    border-bottom: 1px solid #858585;
    padding: 0 0.313rem .5rem;
    margin-bottom: ${({ theme }) => theme.rem.p10};
    pointer-events: none;
  }
`;
