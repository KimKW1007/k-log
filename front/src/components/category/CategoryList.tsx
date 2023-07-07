import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';

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
  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);

  return (
    <CategoryNav>
      <CategoryListBox>
        <h3>카테고리 목록</h3>
        {data &&
          data.map(({ categoryTitle, subCategories }: CategoryBackProps) => (
            <>
              <CategoryTitle>
                <Link prefetch href={`/category/${categoryTitle}`}>
                  {categoryTitle}
                </Link>
              </CategoryTitle>
              {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps) => (
                <CategoryItem>
                  <Link prefetch href={`/category/${categoryTitle}/${categorySubTitle}`}>
                    {categorySubTitle}
                  </Link>
                </CategoryItem>
              ))}
            </>
          ))}
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
  padding: 20px 15px 25px;
  color: #fff;
  h3 {
    font-size: ${({ theme }) => theme.rem.p14};
    border-bottom: 1px solid #858585;
    padding: 0 5px 8px;
    margin-bottom: 10px;
    pointer-events: none;
  }
`;

const CategoryTitle = styled.dt`
  font-size: ${({ theme }) => theme.rem.p14};
  a {
    display: block;
    color: #fff;
    padding: 5px 5px 7px;
    border-radius: 5px;
    transition: 0.2s;
    &:hover {
      background: ${({ theme }) => theme.color.err};
    }
  }
`;

const CategoryItem = styled.dd`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 2px;
  a {
    display: block;
    color: #fff;
    font-size: ${({ theme }) => theme.rem.p12};
    word-break: keep-all;
    padding: 5px 20px;
    transition: 0.2s;
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 4px;
      left: 8px;
      top: 10px;
      transition: 0.2s;
    }
    &:hover {
      background: #484848;
      &:after {
        background: ${({ theme }) => theme.color.err};
      }
    }
  }
  & + ${CategoryTitle} {
    margin-top: 10px;
  }
`;
