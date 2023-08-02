import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { useRouter } from 'next/router';
import CategoryList from './CategoryList';
import useScrollOverHeader from 'src/hooks/useScrollOverHeader';

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
  const { isOverHeader } = useScrollOverHeader();

  useEffect(() => {
    setIsCategoryOn(false);
  }, [router]);

  return (
    <CategoryWrap>
      <CategoryBtn
        isOverHeader={isOverHeader}
        onClick={() => {
          setIsCategoryOn((prev) => !prev);
        }}>
        CATEGORY
        {isCategoryOn ? <UpDirection /> : <DownDirection />}
      </CategoryBtn>
      {isCategoryOn && <CategoryList isOverHeader={isOverHeader} />}
    </CategoryWrap>
  );
};

export default CategoryBox;

const CategoryWrap = styled.div`
  position: fixed;
  z-index: 44;
  @media(max-width: 700px){
    display:none;
  }
`;

const CategoryBtn = styled.button<{ isOverHeader: boolean }>`
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
  ${({ isOverHeader, theme }) =>
  isOverHeader &&
    `
    border: 2px solid #232323;
    background: #fff;
    color:#232323;
    margin-top: ${theme.rem.p30}
  `}
`;

const DownDirection = styled(ChevronDown)`
  width: ${({ theme }) => theme.rem.p20};
`;
const UpDirection = styled(ChevronUp)`
  width: ${({ theme }) => theme.rem.p20};
`;
