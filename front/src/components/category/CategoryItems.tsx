import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@/src/utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import { EmojiDizzyFill } from '@styled-icons/bootstrap/EmojiDizzyFill';
import { EmptyIconBox } from '@/src/components/board/BoardWrapComp';
import TypingLoading from '../common/Loading/TypingLoading';
import { replaceSlash } from '@/src/utils/replaceSlash';

interface CategoryItemsProps {
  setAllBoardLength : React.Dispatch<React.SetStateAction<number>>;
  isOverHeader?: boolean
}

const CategoryItems = ({ isOverHeader, setAllBoardLength }: CategoryItemsProps) => {
  const { getApi } = customApi('/category');
  const { data, isLoading } = useQuery([GET_ALL_CATEGORY], () => getApi());
  const [categoryBoardLength , setCategoryBoardLength] = useState<number[]>([]);
  useEffect(()=>{
    if(data){
      let allBoardLength = 0
      const categoryBoardLength = data.map((ele : any) => {
        let boardLength = 0;
        ele.subCategories.map((obj: any) => {
          boardLength += obj.boards.length;
        })
        allBoardLength += boardLength
        return boardLength
      })
      setCategoryBoardLength(categoryBoardLength)
      setAllBoardLength(allBoardLength)
    }
  },[data])

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
          data.map(({ categoryTitle, subCategories }: CategoryBackProps, idx : number) => (
              <CategoryItmeList $isOverHeader={isOverHeader} key={'categoryTitle' + categoryTitle}>
              <CategoryTitle>
                <Link href={`/category/${replaceSlash(categoryTitle)}`}>{categoryTitle}<span> &#40; {categoryBoardLength[idx]} &#41;</span></Link>
              </CategoryTitle>
              {subCategories.map(({ categorySubTitle, id, boards }: SubCategoryBackProps) => (
                  <CategoryItem key={'categorySubTitle' + categorySubTitle}>
                    <Link href={`/category/${replaceSlash(categoryTitle)}/${replaceSlash(categorySubTitle)}`}>{categorySubTitle} <span> &#40; {boards.length} &#41;</span></Link>
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
    span{
      display:inline-block;
    }
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
