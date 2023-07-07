import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CategoryBackProps } from './CategoryList';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';

const EditButtonBox = ({ data }: { data: CategoryBackProps[] }) => {
  const [currentData, setCurrentDate] = useRecoilState(currentCategoryData);
  const [isError, setIsError] = useState(false);
  const [isChangeValue, setIsChangeValue] = useState(false);
  const queryClient = useQueryClient();
  const {putApi} = customApi("category/updateCategories");
  const {mutate} = useMutation(putApi,{
    onError(error : any) {
      setIsError(true);
        alert(error.response.data.message)
    },
    onSuccess(data) {
      queryClient.invalidateQueries([GET_ALL_CATEGORY]);
      console.log({data})
    },
  })

  useEffect(() => {
    let filteredCategory;
    if(data){
      if (data.length > currentData.length) {
        filteredCategory = data.filter((x) => !currentData.some((i) => i === x));
      } else {
        filteredCategory = currentData.filter((x) => !data.some((i) => i === x));
      }
      if (filteredCategory.length >= 1) {
        setIsChangeValue(true);
      } else {
        setIsChangeValue(false);
      }
    }
    setIsError(false);
  }, [currentData, data]);

  const onSubmit = () => {
    const copiedData = [...currentData];
    const filteredCategory = copiedData.filter((x) => x.categoryTitle === '');
    const filteredSubCategory = copiedData.map((x) => x.subCategories.filter(v => v.categorySubTitle === '')).flat();
    if(filteredCategory.length >= 1 ){
      alert("상위 카테고리 중 비어있는 카테고리가 있습니다")
      return
    }
    if(filteredSubCategory.length >= 1){
      alert("하위 카테고리 중 비어있는 카테고리가 있습니다")
      return
    }
    mutate(currentData)
  };

  return (
    <EditBtnBox>
      <EditBtn onClick={onSubmit} disabled={!isChangeValue} isError={isError} isChangeValue={isChangeValue}>
        수정완료
      </EditBtn>
    </EditBtnBox>
  );
};

export default EditButtonBox;

const EditBtnBox = styled(OnlyJustifyCenterFlex)`
  width: 100%;
  margin-top: 20px;
`;
const EditBtn = styled.button<{ isChangeValue: boolean; isError:boolean; }>`
  padding: 10px 30px;
  border-radius: 6px;
  color: #fff;
  background: #454545;
  transition: 0.3s;
  &:disabled {
    background: #888;
    pointer-events: none;
  }
  ${({ isError,isChangeValue }) =>
    !isError&&isChangeValue &&
    `
    background: #62afb2;
    &:hover{
      background: #408E91;
    }
  `}
  ${({ isError, theme }) =>
    isError && `
    background: ${theme.color.err};
  `}
`;
