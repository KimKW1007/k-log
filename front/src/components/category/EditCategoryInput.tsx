import React, { useState } from 'react';
import { FieldValues, UseFieldArrayRemove, UseFormRegister, useFormContext } from 'react-hook-form';
import styled, { keyframes, css } from 'styled-components';
import { Trash } from '@styled-icons/bootstrap/Trash';
import { currentCategoryData } from '@atoms/atoms';
import { useRecoilState } from 'recoil';
import { ExclamationDiamondFill, ExclamationCircleFill } from '@styled-icons/bootstrap';
import { removeTwoMoreEmptyBetweenString } from '@utils/removeTwoMoreEmptyBetweenString';

/* export interface CategoryInputProps {
  defaultValue?: string;
  sub?: boolean;
  categoryTitle: string;
  categorySubTitle?: string;
  idx ?: number;
  categoryTitleIdx ?: number;
}

const EditCategoryInput = ({ defaultValue, sub = false, categoryTitle, categorySubTitle, idx, categoryTitleIdx }: CategoryInputProps) => {
  const [isOnDeleteBtn, setIsOnDeleteBtn] = useState(false);
  const [isOnDeleteTip, setIsOnDeleteTip] = useState(false);
  const [currentData, setCurrentDate] = useRecoilState(currentCategoryData);

  const checkedDeleteFn = () => {
    let copiedCategory = [...currentData];
    console.log({copiedCategory})
    if (!sub) {
      const filered = copiedCategory.filter((x, i) => {console.log("i, idx",x,i,idx);return i !== idx});
      console.log(filered, idx)
      setCurrentDate(filered);
    } else {
      let findIdx = currentData.findIndex((v, i) => i === categoryTitleIdx);
      
      const filered = copiedCategory[findIdx].subCategories.filter((x , i) => i !== idx);
      console.log({filered})
      copiedCategory[findIdx] = { ...copiedCategory[findIdx], subCategories: filered };
      setCurrentDate(copiedCategory);
    }
  };

  const onClickDeleteInput = () => {
    console.log({idx})
    if (!isOnDeleteBtn) setIsOnDeleteBtn(true);
    else {
      checkedDeleteFn();
    }
  };

  const DeleteTipText = () => {
    if (!sub) {
      return (
        <>
        해당 카테고리 삭제 시<br />하위 카테고리는 모두 삭제됩니다.<br />삭제하시려면 한번 더 눌러주세요.
        </>
      );
    } else {
      return (
        <>
        해당 카테고리를<br />삭제 하시겠습니까?<br />삭제하시려면 한번 더 눌러주세요.
        </>
      );
    }
  };

  const onChaneValues = (value: string, idx: number) => {
    let copiedItem = [...currentData];
    if (!sub) {
      let findIdx = currentData.findIndex((v, i) => i === idx);
      copiedItem[findIdx] = { ...copiedItem[findIdx], categoryTitle: value };
    } else {
      let findIdx = currentData.findIndex((v, i) => i === categoryTitleIdx);
      let copiedCategory = [...copiedItem[findIdx].subCategories]
      let findSubCategoriesIndex = copiedCategory.findIndex((v: any, i: number) => i === idx);
      copiedCategory[findSubCategoriesIndex] = {...copiedCategory[findSubCategoriesIndex], categorySubTitle : value}
      copiedItem[findIdx] =  { ...copiedItem[findIdx], subCategories: copiedCategory };
    }
    setCurrentDate(copiedItem);
  };

  return (
    <EditInputBox>
      <EditInput
        onChange={(e) => {
          onChaneValues(e.target.value, idx!);
        }}
        defaultValue={defaultValue}
        placeholder="카테고리를 입력해주세요"></EditInput>
      <DeleteBox>
        <DeleteBtn type="button" onClick={onClickDeleteInput} onBlur={() => setIsOnDeleteBtn(false)} isOnDeleteBtn={isOnDeleteBtn}>
          <Trash></Trash>
        </DeleteBtn>
        {isOnDeleteBtn && (
          <DeleteTip isOnDeleteBtn={isOnDeleteBtn}>
            <DeleteTipTextBox>
              <ExclamationCircleFill />
              <span>{DeleteTipText()}</span>
            </DeleteTipTextBox>
          </DeleteTip>
        )}
      </DeleteBox>
    </EditInputBox>
  );
};

export default EditCategoryInput;
 */
export interface CategoryInputProps {
  subCategoriesIndex ?: number;
  categoryIndex ?: number;
  sub ?: boolean;
  name: string;
  remove: UseFieldArrayRemove
}

const EditCategoryInput = ({sub = false, categoryIndex, subCategoriesIndex, name, remove} :  CategoryInputProps) => {
  const [isOnDeleteBtn, setIsOnDeleteBtn] = useState(false);
  const { register, watch } = useFormContext();

  const onClickDeleteInput =()=> {
    setIsOnDeleteBtn(true);
    if(isOnDeleteBtn){
      remove(sub ? subCategoriesIndex : categoryIndex)
    }
  }

  const DeleteTipText = () => {
    if (!sub) {
      return (
        <>
        해당 카테고리 삭제 시<br />하위 카테고리는 모두 삭제됩니다.<br />삭제하시려면 한번 더 눌러주세요.
        </>
      );
    } else {
      return (
        <>
        해당 카테고리를<br />삭제 하시겠습니까?<br />삭제하시려면 한번 더 눌러주세요.
        </>
      );
    }
  };

  return (
    <EditInputBox>
      <EditInput {...register(name)} name={name} placeholder="카테고리를 입력해주세요"></EditInput>
      <DeleteBox>
        <DeleteBtn type="button" onClick={onClickDeleteInput} onBlur={() => setIsOnDeleteBtn(false)}   isOnDeleteBtn={false}>
          <Trash></Trash>
        </DeleteBtn>
        {isOnDeleteBtn && (
          <DeleteTip isOnDeleteBtn={isOnDeleteBtn}>
            <DeleteTipTextBox>
              <ExclamationCircleFill />
              <span>{DeleteTipText()}</span>
            </DeleteTipTextBox>
          </DeleteTip>
        )}
      </DeleteBox>
    </EditInputBox>
  );
};

export default EditCategoryInput;

const TipAni = keyframes`
  50%{ top: -98px;}
  
`;

const EditInputBox = styled.div`
  display: flex;
  align-items: center;
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
  background: #ff8989;
  border: 2px solid ${({ theme }) => theme.color.err};
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
  font-size: 13px;
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
    background: #ff8989;
    border-bottom: 2px solid ${({ theme }) => theme.color.err};
    border-right: 2px solid ${({ theme }) => theme.color.err};
  }
  ${({isOnDeleteBtn}) => isOnDeleteBtn && css`
    opacity: 1;
    animation: ${TipAni} 1.5s infinite;
  `}
`;
const DeleteBtn = styled.button<{ isOnDeleteBtn: boolean }>`
  width: 28px;
  height: 28px;
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
  line-height: 18px;
  border: 1px solid #a5a5a5;
  outline: none;
  background: #f0f0f0;
  padding: 6px 10px 4px;
  border-radius: 5px;
  transition: 0.2s;
  &:focus {
    border: 1px solid #000;
    background: #fff;
  }
`;
