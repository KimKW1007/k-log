import React, { useState } from 'react';
import styled from 'styled-components';
import { OnlyAlignCenterFlex } from './CommonFlex';
import checkedIcon from '@images/check.svg';
import { ArrowUpRightSquareFill } from '@styled-icons/bootstrap';
import CommonModal from '@components/modal/CommonModal';
import { ChildrenProps } from '@src/types/children';

interface CheckBoxProps extends ChildrenProps {
  id: string;
  onClick: any;
}

const CheckBoxInputs = ({ children, id, onClick }: CheckBoxProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <InputBox>
      <CheckBoxInput className="blind" type="checkbox" id={id} onClick={onClick} />
      <Label htmlFor={id}>{children}</Label>
      <DetailBtn
        type="button"
        onClick={() => {
          setIsOpenModal(true);
        }}>
        <ArrowUpRightSquareFill />
      </DetailBtn>
      {isOpenModal && <CommonModal setIsOpenModal={setIsOpenModal}>아직 준비 중 입니다.</CommonModal>}
    </InputBox>
  );
};

export default CheckBoxInputs;

const InputBox = styled(OnlyAlignCenterFlex)`
  width: 100%;
  & + & {
    margin-top: 30px;
  }
  justify-content: space-between;
`;

export const CheckBoxInput = styled.input`
  &:checked + label {
    &::before {
      background: url(${checkedIcon.src}) center center no-repeat;
      background-size: 70%;
      background-color: #000;
    }
  }
`;

export const Label = styled.label`
  position: relative;
  display: inline-flex;
  align-items:center;
  font-size: 24px;
  &:before {
    position: relative;
    z-index: 1;
    content: '';
    width: 0.8em;
    height: 0.8em;
    border: 1px solid #000;
    margin: auto 20px auto 0;
    transition: background-color 0.3s;
    border-radius: 4px;
  }
  @media(max-width:660px){
  font-size: 3.6363vw;
    &:before {
      margin-right: 10px;
    }
  }
`;

const DetailBtn = styled.button`
  width: ${({ theme }) => theme.rem.p24};
  height: ${({ theme }) => theme.rem.p24};
`;
