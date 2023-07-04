import React, { useEffect, useRef, useState } from 'react';
import styled,{keyframes} from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/entypo';
import { useCycle } from 'framer-motion';

interface CategoryProps {
  setIsCategoryOn: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryOn: boolean;
}
const CategoryBox = ({ setIsCategoryOn, isCategoryOn }: CategoryProps) => {
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      console.log({currentScroll})
      setCurrentScroll(window.scrollY)
    })
  })

  return (
    <CategoryWrap>
      <CategoryBtn
      currentScroll={currentScroll}
        onClick={() => {
          setIsCategoryOn(prev=>!prev);
        }}>
        CATEGORY
        {isCategoryOn ? <UpDirection /> : <DownDirection />}
      </CategoryBtn>
      {isCategoryOn && <CategoryNav>
        <CategoryListBox>
          <h3>분류 보기</h3>
          <CategoryItem>자바스크립트 | JavaScript  자바스크립트 | JavaScript 자바스크립트 | JavaScript 자바스크립트 | JavaScript</CategoryItem>
          <CategoryItem>타입스크립트 | TypeScript </CategoryItem>
          <CategoryItem>리액트 | React.js </CategoryItem>
          <CategoryItem>리덕스 | Redux </CategoryItem>
          <CategoryItem>노드 | Node.js </CategoryItem>
          <CategoryItem>노드 | Node.js </CategoryItem>
          <CategoryItem>노드 | Node.js </CategoryItem>
          <CategoryItem>노드 | Node.js </CategoryItem>
          <CategoryItem>노드 | Node.js </CategoryItem>
        </CategoryListBox>
      </CategoryNav>}
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

const CategoryWrap = styled.div`
  position: fixed;
  z-index: 44;
`;
const CategoryNav = styled.nav`
  position: absolute;
  border : 1px solid #565656;
  margin-top: 2px;
  animation: ${DropAni} 0.4s forwards;
  border-top: 4px solid ${({theme}) => theme.color.err};
  border-radius: 0 0 20px 20px;
  overflow:hidden;

`;

const CategoryBtn = styled.button<{currentScroll : number}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
  height: ${({ theme }) => theme.rem.p40};
  transition : .4s ease-in-out;
  border: 2px solid transparent;
  border-bottom: 2px solid #000;
  padding-left: ${({ theme }) => theme.rem.p10};
  text-align: left;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  font-weight: bold;
  background: rgba(255, 255, 255, 0);
  ${({currentScroll}) => currentScroll >= 70 && `
  border: 2px solid #000;
  background: rgba(255, 255, 255, 1);
  `}
`;

const DownDirection = styled(ChevronDown)`
  width: ${({ theme }) => theme.rem.p20};
`;
const UpDirection = styled(ChevronUp)`
  width: ${({ theme }) => theme.rem.p20};
`;

const CategoryListBox = styled.ul`
  display: flex;
  flex-direction : column;
  min-width: 230px;
  background: #292929;
  padding: 20px 15px 25px;
  color:#fff;
  h3{
    font-size : ${({ theme }) => theme.rem.p14};
    border-bottom: 1px solid #b5b5b5;
    padding: 0 7px 8px;
    margin-bottom: 10px;
  }
`;

const CategoryItem = styled.li`
  font-size : ${({ theme }) => theme.rem.p14};
  word-break: keep-all;
  position: relative;
  padding: 5px 20px;
  transition: .2s;
  border-radius: 5px;
  &:after{
    content:"";
    position: absolute;
    display:block;
    width: 4px;
    height: 4px;
    background : #fff;
    border-radius: 4px;
    left: 8px;
    top : 10px;
    transition: .2s;
  }
  &:hover{
    background: #484848;
    &:after{
      background : ${({theme}) => theme.color.err};
    }
  }
`;
