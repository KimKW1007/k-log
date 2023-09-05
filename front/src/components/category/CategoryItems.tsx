import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@/src/utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { EmptyIconBox } from '@/src/components/board/BoardWrapComp';
import TypingLoading from '../common/Loading/TypingLoading';

const CategoryItems = ({ isOverHeader }: { isOverHeader?: boolean }) => {
  const { getApi } = customApi('/category');
  const { data, isLoading } = useQuery([GET_ALL_CATEGORY], () => getApi());
  return (
    <>
    {isLoading ? <TypingLoading /> :
    <>
      {data?.length > 0 || (
          <EmptyCategoryBox>
            <EmojiDizzyFill />
            <p>준비된 카테고리가 없어요..</p>
          </EmptyCategoryBox>
        )}
        {data?.length > 0 &&
          data.map(({ categoryTitle, subCategories }: CategoryBackProps) => (
            <CategoryItmeList $isOverHeader={isOverHeader} key={'categoryTitle' + categoryTitle}>
              <CategoryTitle>
                <Link href={`/category/${categoryTitle.replaceAll('/', '-')}`}>{categoryTitle}</Link>
              </CategoryTitle>
              {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps) => (
                <CategoryItem key={'categorySubTitle' + categorySubTitle}>
                  <Link href={`/category/${categoryTitle.replaceAll('/', '-')}/${categorySubTitle.replaceAll('/', '-')}`}>{categorySubTitle}</Link>
                </CategoryItem>
              ))}
            </CategoryItmeList>
          ))}
      </>
      }
    </>
  );
};

export default CategoryItems;

const EmptyCategoryBox = styled(EmptyIconBox)`
  min-height: 300px;
`;

const CategoryItmeList = styled.dl<{ $isOverHeader?: boolean }>`
  & + & {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid ${({ theme }) => theme.color.lightGrey};
  }
  ${({ $isOverHeader, theme }) =>
    $isOverHeader &&
    `

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
`;

const CategoryTitle = styled.dt`
  font-size: 14px;
  a {
    display: block;
    color: #fff;
    padding: 8px 8px;
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
    font-size: 13px;
    word-break: keep-all;
    padding: 7px 20px;
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
      top: 11px;
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
