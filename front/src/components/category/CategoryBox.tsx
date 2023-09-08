import React, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { usePathname } from 'next/navigation';
import CategoryList from './CategoryList';
import useScrollOverHeader from '@/src/hooks/useScrollOverHeader';
import useHandleClickOutside from '@/src/hooks/useHandleClickOutside';


const CategoryBox = () => {
  const pathname = usePathname();
  const categoryRef = useRef<HTMLDivElement>(null);

  const [isCategoryOn, setIsCategoryOn] = useState(false);
  const { isOverHeader } = useScrollOverHeader();

  useEffect(() => {
    setIsCategoryOn(false);
  }, [pathname]);

  useHandleClickOutside(categoryRef, setIsCategoryOn);

  return (
    <CategoryWrap ref={categoryRef} >
      <CategoryBtn
        isOverHeader={isOverHeader}
        onClick={() => {
          setIsCategoryOn((prev) => !prev);
        }}>
        <CategoryText>CATEGORY</CategoryText>
        <ArrowBox>
          {isCategoryOn ? <ChevronUp /> : <ChevronDown />}
        </ArrowBox>
      </CategoryBtn>
      {isCategoryOn && <CategoryList isOverHeader={isOverHeader} />}
    </CategoryWrap>
  );
};

export default CategoryBox;

const CategoryWrap = styled.div`
  width: 160px;
  height: 40px;
  position: fixed;
  z-index: 44;
  @media (max-width: 700px) {
    display: none;
  }
`;

const CategoryBtn = styled.button<{ isOverHeader ?: boolean }>`
  position: relative;
  width:100%;
  height:100%;
  transition: 0.4s ease-in-out;
  border-bottom: 2px solid #f5f5f5;
  text-align: left;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background: #232323;
  color: #fff;
  
  ${({ isOverHeader, theme }) =>
    isOverHeader &&
    `
    border-bottom: 2px solid ${theme.color.success};
    background: #fff;
    color:#232323;
    margin-top: 30px
  `}
`;

export const CategoryText = styled.span`
  position:relative;
  z-index:3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  height:100%;
  margin-left: 20px;
  user-select: none;
`

const ArrowBox = styled.div`
  position : absolute;
  z-index: 2;
  right : 6px;
  top: 50%;
  transform: translateY(-50%);
  svg{
    width: 20px;
  }
`
