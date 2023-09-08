import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import CategoryItems from '@/src/components/category/CategoryItems';
import { CategoryAllListLink } from '@/src/components/category/CategoryList';

const SidebarCategoryBox = ({ isMenu }: { isMenu?: boolean }) => {
  const [allBoardLength, setAllBoardLength] = useState(0);
  return (
    <CategoryBox className="customScroll" isMenu={isMenu}>
      <CategoryAllListLink href={'/category'}>분류 전체보기<span> &#40; {allBoardLength} &#41;</span></CategoryAllListLink>
      <CategoryItems setAllBoardLength={setAllBoardLength} />
    </CategoryBox>
  );
};

export default SidebarCategoryBox;

const CategoryBox = styled.div<{ isMenu?: boolean }>`
  ${({ isMenu }) =>
    isMenu ?css`
    width:100%;
    min-height: 300px;
  `: css`
    width: 90%;
    padding: 0 30px;
    margin: 0 auto;
    max-height: 500px;
    overflow-y: scroll;
  `}
  dt {
    margin-bottom: 5px;
    a {
      font-size: 16px;
      padding: 10px 7px;
    }
  }
  dd {
    a {
      font-size: 14px;
      padding: 10px 30px;
      &:after {
        left: 14px;
        top: 16px;
      }
    }
  }
  ${CategoryAllListLink} {
    font-size: 16px;
  }
`;
