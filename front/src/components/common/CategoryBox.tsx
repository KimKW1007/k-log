import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import Link from 'next/link';
import customApi from '../../utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';

interface CategoryProps {
  setIsCategoryOn: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryOn: boolean;
}
interface CategoryBackProps {
  id: number;
  categoryTitle: string;
  subCategories: SubCategoryBackProps[];
}
interface SubCategoryBackProps {
  id: number;
  categorySubTitle: string;
}
const CategoryBox = ({ setIsCategoryOn, isCategoryOn }: CategoryProps) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);



  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log({ currentScroll });
      setCurrentScroll(window.scrollY);
    });
  });

  return (
    <CategoryWrap currentScroll={currentScroll}>
      <CategoryBtn
        currentScroll={currentScroll}
        onClick={() => {
          setIsCategoryOn((prev) => !prev);
        }}
        onBlur={()=>{setIsCategoryOn(false);}}
        >
        CATEGORY
        {isCategoryOn ? <UpDirection /> : <DownDirection />}
      </CategoryBtn>
      {isCategoryOn && (
        <CategoryNav>
          <CategoryListBox>
            <h3>분류 전체보기</h3>
            {data &&
              data.map(({ categoryTitle, subCategories }: CategoryBackProps) => (
                <>
                  <CategoryTitle>
                    <Link
                      prefetch
                      href={`/category/${categoryTitle}`}
                      onClick={() => {
                        setIsCategoryOn(false);
                      }}>
                      {categoryTitle}{' '}
                    </Link>
                  </CategoryTitle>
                  {subCategories.map(({ categorySubTitle, id }: SubCategoryBackProps) => (
                    <CategoryItem>
                      <Link
                        prefetch
                        href={`/category/${categoryTitle}/${categorySubTitle}`}
                        onClick={() => {
                          setIsCategoryOn(false);
                        }}>
                        {categorySubTitle}
                      </Link>
                    </CategoryItem>
                  ))}
                </>
              ))}
          </CategoryListBox>
        </CategoryNav>
      )}
    </CategoryWrap>
  );
};

export default CategoryBox;
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

const CategoryWrap = styled.div<{ currentScroll: number }>`
  position: fixed;
  z-index: 44;
  transition: 0.4s ease-in-out;
  ${({ currentScroll }) =>
    currentScroll >= 70 &&
    `
    margin-top: 30px;
  `}
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

const CategoryBtn = styled.button<{ currentScroll: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
  height: ${({ theme }) => theme.rem.p40};
  transition: 0.4s ease-in-out;
  border: 2px solid transparent;
  border-bottom: 2px solid #f5f5f5;
  padding-left: ${({ theme }) => theme.rem.p10};
  text-align: left;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background: #232323;
  color: #fff;
  ${({ currentScroll }) =>
    currentScroll >= 70 &&
    `
    border: 2px solid #232323;
    background: #fff;
    color:#232323;
  `}
`;

const DownDirection = styled(ChevronDown)`
  width: ${({ theme }) => theme.rem.p20};
`;
const UpDirection = styled(ChevronUp)`
  width: ${({ theme }) => theme.rem.p20};
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
