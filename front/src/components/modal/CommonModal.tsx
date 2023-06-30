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
        <Dim/>
        <ModalBox>
          <ModalTitle>안내</ModalTitle>
          <ModalInnerText>
            {children}
          </ModalInnerText>
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

const ModalWrap = styled(AllCenterFlex)`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 55;
  width: 100%;
  height: 100%;
`;

const Dim = styled.div`
position: absolute;
width:100%;
height:100%;
z-index :1;
top: 0;
left: 0;
background: rgba(0,0,0,.3);
`

const ModalBox = styled(AllCenterFlex)`
  position: relative;
  z-index :2;
  width: 52rem;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.rem.p20} ;
  border-radius: 10px;
  background: #fff;

  
`;

const ModalInnerText = styled.div`
  font-size:${({ theme }) => theme.rem.p24};
  margin:0 0 ${({ theme }) => theme.rem.p30} ;

`

const ModalTitle = styled.h2`
  font-size:${({ theme }) => theme.rem.p34};
  font-weight:bold;
  margin:${({ theme }) => theme.rem.p10} 0 ${({ theme }) => theme.rem.p30} ;
`



const CloseBtn =styled.button`
  background: inherit;
  font-size:${({ theme }) => theme.rem.p22};
  font-weight:bold;
  letter-spacing:-1px;
  color: #FF1E00;
  transition:  .2s;
  padding:  0.25rem ${({ theme }) => theme.rem.p20};
  border-radius: 5px;
  &:hover{
    color: #9772FB;
    background: #e9e9e9;
  }
`