import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { useRouter } from 'next/router';
import CategoryList from './CategoryList';

interface CategoryBackProps {
  id: number;
  categoryTitle: string;
  subCategories: SubCategoryBackProps[];
}
interface SubCategoryBackProps {
  id: number;
  categorySubTitle: string;
}
const CategoryBox = () => {
  const router = useRouter();
  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setCurrentScroll(window.scrollY);
    });
    return () => window.removeEventListener('scroll', () => {});
  });

  useEffect(() => {
    setIsCategoryOn(false);
  }, [router]);

  return (
    <CategoryWrap currentScroll={currentScroll}>
      <CategoryBtn
        currentScroll={currentScroll}
        onClick={() => {
          setIsCategoryOn((prev) => !prev);
        }}>
        CATEGORY
        {isCategoryOn ? <UpDirection /> : <DownDirection />}
      </CategoryBtn>
      {isCategoryOn && <CategoryList isScroll={Boolean(currentScroll >= 70)} />}
    </CategoryWrap>
  );
};

export default CategoryBox;

const CategoryWrap = styled.div<{ currentScroll: number }>`
  position: fixed;
  z-index: 44;
  transition: 0.4s ease-in-out;
  ${({ currentScroll,theme }) =>
    currentScroll >= 70 &&
    `
    margin-top: ${theme.rem.p30}
  `}
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
  font-size: ${({ theme }) => theme.rem.p12};
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
