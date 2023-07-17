import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';

const CategoryItems = ({isOverHeader} : {isOverHeader ?:boolean}) => {
  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);
  return (
    <>
      {data &&
        data.map(({ categoryTitle, subCategories }: CategoryBackProps) => (
          <CategoryItmeList isOverHeader={isOverHeader} key={categoryTitle}>
            <CategoryTitle>
              <Link href={`/category/${categoryTitle}`}>
                {categoryTitle}
              </Link>
            </CategoryTitle>
            {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps) => (
              <CategoryItem key={categorySubTitle}>
                <Link href={`/category/${categoryTitle}/${categorySubTitle}`}>
                  {categorySubTitle}
                </Link>
              </CategoryItem>
            ))}
          </CategoryItmeList>
        ))}
    </>
  );
};

export default CategoryItems;

const CategoryItmeList = styled.dl<{isOverHeader ?: boolean}>`
& + & {
  margin-top: 10px;
}
${({isOverHeader, theme}) => isOverHeader &&`

  dt, dd{
    a{
      color:#232323;
      &:after {
        background: ${theme.color.success};
      }
      &:hover{
        color:#fff;
        background: ${theme.color.success};
        &:after {
          background: #fff;
        }
      }
    }
  }

`}
`

const CategoryTitle = styled.dt`
  font-size: ${({ theme }) => theme.rem.p14};
  margin-bottom: 2px;
  a {
    display: block;
    color: #fff;
    padding: 5px;
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
`;
