import { ChildrenProps } from '@/src/types/children';
import React from 'react';
import styled from 'styled-components';

interface CertificateBtnBoxProps extends ChildrenProps {
  onClick: () => Promise<void> | void;
}

const CertificateBtnBox = ({ children, onClick }: CertificateBtnBoxProps) => {
  return (
    <CertificateBtnArea>
      <CertificateBtn type="button" onClick={onClick}>
        {children}
      </CertificateBtn>
    </CertificateBtnArea>
  );
};

export default CertificateBtnBox;

export const CertificateBtnArea = styled.div`
  position: absolute;
  z-index: 4;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  width: 90px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
`;

export const CertificateBtn = styled.button`
  width: 100%;
  height: 100%;
  font-size: 12px;
  background: #787878;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background: #454545;
  }
`;
