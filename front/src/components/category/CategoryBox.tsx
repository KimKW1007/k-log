import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { useRouter } from 'next/router';
import CategoryList from './CategoryList';
import useScrollOverHeader from 'src/hooks/useScrollOverHeader';
import useHandleClickOutside from 'src/hooks/useHandleClickOutside';

const CategoryBox = () => {
  const router = useRouter();
  const categoryRef = useRef<HTMLDivElement>(null);

  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const { isOverHeader } = useScrollOverHeader();

  useEffect(() => {
    setIsCategoryOn(false);
  }, [router]);

  useHandleClickOutside(categoryRef, setIsCategoryOn);

  return (
    <CategoryWrap ref={categoryRef}>
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
  @media (max-width: 700px) {
    display: none;
  }
`;

const CategoryBtn = styled.button<{ isOverHeader: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
  height: 40px;
  transition: 0.4s ease-in-out;
  border: 2px solid transparent;
  border-bottom: 2px solid #f5f5f5;
  padding-left: 10px;
  text-align: left;
  font-size: 12px;
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
    margin-top: 30px
  `}
`;

const DownDirection = styled(ChevronDown)`
  width: 20px;
`;
const UpDirection = styled(ChevronUp)`
  width: 20px;
`;
