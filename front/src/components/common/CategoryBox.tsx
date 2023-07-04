import React from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { motion } from "framer-motion"


interface CategoryProps {
  setIsCategoryOn: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryOn: boolean;
}

const CategoryBox = ({ setIsCategoryOn, isCategoryOn }: CategoryProps) => {
  return (
    <>
    <CategoryBtn
      onClick={() => {
        setIsCategoryOn((prev) => !prev);
      }}>
      CATEGORY
      {isCategoryOn ? <UpDirection /> : <DownDirection />}
    </CategoryBtn>
    </>
  );
};

export default CategoryBox;

const CategoryBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
  height: ${({ theme }) => theme.rem.p40};
  margin-right: ${({ theme }) => theme.rem.p30};
  border-bottom: 1px solid #000;
  padding-left: ${({ theme }) => theme.rem.p10};
  text-align: left;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background: rgba(0, 0, 0, 0);
`;

const DownDirection = styled(ChevronDown)`
  width: ${({ theme }) => theme.rem.p20};
`;
const UpDirection = styled(ChevronUp)`
  width: ${({ theme }) => theme.rem.p20};
`;
