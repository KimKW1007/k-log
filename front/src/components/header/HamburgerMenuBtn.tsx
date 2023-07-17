import React from "react";
import useScrollOverHeader from "src/hooks/useScrollOverHeader";
import styled, { keyframes, css } from 'styled-components';

interface MenuProps {
  isOpen: boolean;
  handleClickMenu: () => void;
}

const HamburgerMenuBtn = ({ isOpen, handleClickMenu }: MenuProps) => {
  const { isOverHeader } = useScrollOverHeader();

  return (
    
    <MenuBtnBox className={isOpen ? "active" : ""} isOverHeader={isOverHeader}>
      <MenuBtn onClick={handleClickMenu}>
        <LineBox>
          <span />
          <span />
          <span />
        </LineBox>
      </MenuBtn>
    </MenuBtnBox>
  );
};
export default HamburgerMenuBtn;

const MenuBtnBox = styled.div<{isOverHeader : boolean}>`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2100;
  width: 70px;
  height: 70px;
  background: transparent;
  border-radius: 0 0 0 10px;
  box-shadow: -5px 5px 12px rgba(78, 83, 188, 0);
  overflow: hidden;
  transition: 0.6s;
  ${({isOverHeader}) => isOverHeader &&`
    background: #454545;
    box-shadow: -2px 0px 12px 2px rgba(255, 255, 255, .5);
  `}

  &.active {
    background: #A0BFE0;
    box-shadow: -5px 5px 12px rgba(78, 83, 188, 0.5);
    button {
      div {
        transform: rotate(180deg);
        span:nth-child(1) {
          width: 50%;
          transform: translate(-2px, 5px) rotate(-45deg);
        }
        span:nth-child(3) {
          width: 50%;
          transform: translate(-2px, -5px) rotate(45deg);
        }
      }
    }
  }



`;
const MenuBtn = styled.button`
  width: 100%;
  height: 100%;
  padding: 24px 20px;
  background: transparent;

`;

const LineBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.6s;
  span {
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: #fff;
    transition: transform 0.6s, width 0.6s, background 0.6s;
    
  }
`;
