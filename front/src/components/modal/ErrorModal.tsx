import { AllCenterFlex } from '@components/common/CommonFlex';
import React, { useState } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { ChildrenProps } from '@components/layout/Layout';

interface MadalProps extends ChildrenProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal = ({ children, setIsOpenModal }: MadalProps) => {
  return (
    <ModalPortal>
      <ModalWrap>
        <ModalBox>
          <ModalInnerText>
            {children}
          </ModalInnerText>
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}>
            닫기
          </button>
        </ModalBox>
      </ModalWrap>
    </ModalPortal>
  );
};

export default ErrorModal;

const ModalWrap = styled(AllCenterFlex)`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 55;
  width: 100%;
  height: 100%;
`;

const ModalInnerText = styled.div`
  
`

const ModalBox = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid #000;
`;
