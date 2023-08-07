import { AllCenterFlex } from '@components/common/CommonFlex';
import React, { useState } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { ChildrenProps } from '@src/types/children';

interface MadalProps extends ChildrenProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonModal = ({ children, setIsOpenModal }: MadalProps) => {
  return (
    <ModalPortal>
      <ModalWrap>
        <Dim />
        <ModalBox>
          <ModalTitle>안내</ModalTitle>
          <ModalInnerText>{children}</ModalInnerText>
          <CloseBtn
            onClick={() => {
              setIsOpenModal(false);
            }}>
            확인
          </CloseBtn>
        </ModalBox>
      </ModalWrap>
    </ModalPortal>
  );
};

export default CommonModal;

export const ModalWrap = styled(AllCenterFlex)`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 55;
  width: 100%;
  height: 100%;
  color: #232323;
`;

export const Dim = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const ModalBox = styled(AllCenterFlex)`
  position: relative;
  z-index: 2;
  width: 830px;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
`;

export const ModalInnerText = styled.div`
  font-size: 24px;
  margin: 0 0 30px;
  word-break:keep-all;
  text-align:center;
`;

export const ModalTitle = styled.h2`
  font-size: 34px;
  font-weight: bold;
  margin: 10px 0 30px;
`;

const CloseBtn = styled.button`
  background: inherit;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #ff1e00;
  transition: 0.2s;
  padding: 0.25rem 20px;
  border-radius: 5px;
  &:hover {
    color: #9772fb;
    background: #e9e9e9;
  }
`;
