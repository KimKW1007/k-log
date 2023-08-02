import React, { useState } from 'react';
import {  UseFieldArrayRemove,  useFormContext } from 'react-hook-form';
import styled, { keyframes, css } from 'styled-components';
import { Trash } from '@styled-icons/bootstrap/Trash';

import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import DeleteModal from '@components/modal/DeleteModal';
import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';


export interface CategoryInputProps {
  subCategoriesIndex ?: number;
  categoryIndex ?: number;
  sub ?: boolean;
  name: string;
  remove: UseFieldArrayRemove
}

const EditCategoryInput = ({sub = false, categoryIndex, subCategoriesIndex, name, remove} :  CategoryInputProps) => {
  const [isOnDeleteBtn, setIsOnDeleteBtn] = useState(false);
  const { register } = useFormContext();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const onClickDeleteInput =()=> {
    remove(sub ? subCategoriesIndex : categoryIndex)
  }

  const handleDeleteModal = ()=>{
    setIsOpenDeleteModal(true)
  }

  const DeleteTipText = () => {
    if (!sub) {
      return (
        <>
        해당 카테고리 삭제 시<br />하위 카테고리 및 하위 카테고리에 작성된 게시물 모두 삭제됩니다.
        </>
      );
    } else {
      return (
        <>
        해당 카테고리 삭제 시<br />해당 카테고리에 작성된<br />게시물 모두 삭제됩니다.
        </>
      );
    }
  };

  return (
    <EditInputBox>
      <EditInput {...register(name)} name={name} placeholder="카테고리를 입력해주세요"></EditInput>
      <DeleteBox>
        <DeleteBtn type="button" onClick={handleDeleteModal} onMouseLeave={() => setIsOnDeleteBtn(false)}  onMouseOver={() => setIsOnDeleteBtn(true)} isOnDeleteBtn={isOpenDeleteModal || isOnDeleteBtn}>
          <Trash></Trash>
        </DeleteBtn>
        {(isOpenDeleteModal || isOnDeleteBtn) && (
          <DeleteTip isOnDeleteBtn={isOpenDeleteModal || isOnDeleteBtn}>
            <DeleteTipTextBox>
              <ExclamationCircleFill />
              <span>{DeleteTipText()}</span>
            </DeleteTipTextBox>
          </DeleteTip>
        )}
        {isOpenDeleteModal && <DeleteModal onClose={()=>setIsOpenDeleteModal(false)} mutate={onClickDeleteInput}/>}
      </DeleteBox>
    </EditInputBox>
  );
};

export default EditCategoryInput;

const TipAni = keyframes`
  50%{ top: -98px;}
  
`;

const EditInputBox = styled(OnlyAlignCenterFlex)`
  flex : 1;
`;
const DeleteBox = styled.div`
  position: relative;
  z-index: 3;
`;

const DeleteTipTextBox = styled.div`
  width: 220px;
  position: relative;
  z-index: 2;
  padding: 15px 5px 15px;
  word-break: keep-all;
  text-align: center;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.err};
  font-size: 13px;
  border: 2px solid #ff8989;
  svg {
    position: absolute;
    left: 8px;
    top: 8px;
    width: 14px;
  }
`;
const DeleteTip = styled.div<{ isOnDeleteBtn: boolean }>`
  position: absolute;
  left: -168px;
  top: -94px;
  color: #fff;
  pointer-events: none;
  opacity: 0;
  transition : .4s;
  &:after {
    content: '';
    position: absolute;
    z-index: 3;
    display: block;
    bottom: -8px;
    right: 28px;
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    border-radius: 0 0 2px 0;
    background: ${({ theme }) => theme.color.err};
    border-bottom: 2px solid #ff8989;
    border-right: 2px solid #ff8989;
  }
  ${({isOnDeleteBtn}) => isOnDeleteBtn && css`
    opacity: 1;
    animation: ${TipAni} 1.5s infinite;
  `}
`;
const DeleteBtn = styled.button<{ isOnDeleteBtn: boolean }>`
  width: ${({ theme }) => theme.rem.p28};
  height: ${({ theme }) => theme.rem.p28};
  padding: 5px;
  margin-left: 2px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.err};
  background: #ff8989;
  transition: 0.3s;
  svg {
    width: 100%;
    color: #fff;
  }
  ${({ isOnDeleteBtn, theme }) =>
    isOnDeleteBtn &&
    `
  border-radius: 50%;
  background: ${theme.color.err};
  `}
`;

const EditInput = styled.input`
  width: 100%;
  line-height: 30px;
  border: 1px solid #a5a5a5;
  outline: none;
  background: #f0f0f0;
  padding: 6px 10px 4px ;
  border-radius: 5px;
  transition: 0.2s;
  &:focus {
    border: 1px solid #000;
    background: #fff;
  }
`;
