import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import customApi from '@utils/customApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import AddCategoryBtn from './AddCategoryBtn';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import EditCategoryItemBox, { MoveAttraction } from './EditCategoryItemBox';
import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { removeTwoMoreEmptyBetweenString } from '@utils/removeTwoMoreEmptyBetweenString';
import { CategoryBackProps } from '@components/category/CategoryList';
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import Loading from '@components/common/Loading/Loading';

const EditCategoryList = () => {
  // mutate - putApi 관련
  const [isError, setIsError] = useState(false);
  const [isChangeValue, setIsChangeValue] = useState(false);
  const queryClient = useQueryClient();
  const { putApi } = customApi('category/updateCategories');
  const { mutate, isLoading } = useMutation(putApi, {
    onError(error: any) {
      setIsError(true);
      alert(error.response.data.message);
    },
    onSuccess(data) {
      console.log({ data });
      setTimeout(()=>{
        queryClient.invalidateQueries([GET_ALL_CATEGORY])
        setIsChangeValue(false);
      },500)
    },
    
  });

  // getAPI 관련
  const { getApi } = customApi('/category');
  const { data } = useQuery([GET_ALL_CATEGORY], () => getApi());

  // useForm
  const methods = useForm({
    mode: 'all',
    defaultValues: useMemo(() => {
      return { category: data };
    }, [data])
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, dirtyFields }
  } = methods;
  const { append, remove, fields, move } = useFieldArray<{category : any }>({
    control,
    name: 'category'
  });

  const onSubmit = (data: any) => {
    if (isError) return;
    const categoryData = data.category;
    const filteredCategory = categoryData.filter((x: CategoryBackProps) => x.categoryTitle === '');
    const filteredSubCategory = categoryData.map((x: CategoryBackProps) => x.subCategories.filter((v) => v.categorySubTitle === '')).flat();
    if (filteredCategory.length > 0) {
      alert('상위 카테고리 중 비어있는 카테고리가 있습니다');
      return;
    }
    if (filteredSubCategory.length > 0) {
      alert('하위 카테고리 중 비어있는 카테고리가 있습니다');
      return;
    }
    const copiedCategoryData = [...categoryData];
    const result = copiedCategoryData.map((cateTitle: CategoryBackProps, idx : number) => {
      cateTitle = { ...cateTitle, categoryTitle: removeTwoMoreEmptyBetweenString(cateTitle.categoryTitle), dndNumber : idx + 1 };
      const cateSubTitle = cateTitle.subCategories.map((cateSubTitle: { categorySubTitle: string }) => {
        return { ...cateSubTitle, categorySubTitle: removeTwoMoreEmptyBetweenString(cateSubTitle.categorySubTitle) };
      });
      cateTitle = { ...cateTitle, subCategories: cateSubTitle };
      return cateTitle;
    });
    console.log({result})
    mutate(result);
  };

  useEffect(() => {
    if (isDirty) {
      setIsChangeValue(true);
    } else {
      setIsChangeValue(false);
    }
  }, [isDirty]);
  console.log({isDirty})

  // input에 변화가 일어나면 error false
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log({ value, name, type })
      value.category?.map((category: any, index :number) =>{
        if(category.dndNumber !== index + 1){
          setIsChangeValue(true);
          return;
        }else{
          setIsChangeValue(false);
          return;
        }
      })
      if (type === 'change') {
        setIsError(false);
        setIsChangeValue(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isDirty]);

  // 기본값
  useEffect(() => {
    reset({ category: data });
  }, [data]);


  const onDragEnd =(result : DropResult)=>{
    move(result.source.index, result.destination?.index!);
  }
  
  

  return (
    <CategoryNav>
      <CategoryListBox>
        <h3>카테고리 목록</h3>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="category">
                {(magic) => (
                  <div ref={magic.innerRef} {...magic.droppableProps}>
                    {fields.map((category, index) =>  (
                        <Draggable key={String(category.id)} draggableId={String(category.id)} index={index}>
                          {(magic, snapshot) => (
                              <DraggableInnerBox
                              ref={magic.innerRef}
                              {...magic.draggableProps}
                              {...magic.dragHandleProps}
                              isDragging={snapshot.isDragging}
                              >
                                <EditCategoryItemBox categoryIndex={index} key={category.id} remove={remove} />
                              </DraggableInnerBox>
                            )
                          }
                        </Draggable>
                      )
                    )}
                  {magic.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <AddCategoryBtnBox isNotItem={fields.length > 0}>
              <AddCategoryBtn
                onClick={() => {
                  append({ dndNumber: fields.length, categoryTitle: '', subCategories: [] });
                }}/>
            </AddCategoryBtnBox>
            <EditBtnBox>
              <EditBtn disabled={!isChangeValue} isError={isError} isChangeValue={isChangeValue}>
                {isLoading ? "수정 중" : isChangeValue ? '수정하기' : '수정완료'}
              </EditBtn>
            </EditBtnBox>
          </Form>
        </FormProvider>
      </CategoryListBox>
    </CategoryNav>
  );
};

export default EditCategoryList;

const OnErrorShakeAni = keyframes`
  0% {
    transform: translateX(0px)
    }
  25% {
      transform: translateX(-4px);
    }
  50% {
      transform: translateX(4px);
    }
  75% {
      transform: translateX(-4px);
    }
  100% {
      transform: rotate(0px);
    }
`;

const EditBtnBox = styled(OnlyJustifyCenterFlex)`
  width: 100%;
  margin-top: ${({ theme }) => theme.rem.p20};
`;
export const EditBtn = styled.button<{ isChangeValue: boolean; isError?: boolean }>`
  width: 114px;
  padding: 10px 30px;
  border-radius: 6px;
  color: #fff;
  background: #454545;
  transition: 0.3s;

  &:disabled {
    background: #888;
    pointer-events: none;
  }
  ${({ isError, isChangeValue }) =>
    !isError &&
    isChangeValue &&
    `
    background: #62afb2;
    &:hover{
      background: #408E91;
    }
  `}
  ${({ isError, theme }) =>
    isError &&
    css`
      background: ${theme.color.err};
      animation: ${OnErrorShakeAni} 0.3s both;
      cursor: not-allowed;
    `}
`;
const Form = styled.form`
  position: relative;
`;

const CategoryNav = styled.nav`
  position: relative;
  z-index: 3;
  width: 100%;
  margin-top: 2px;
  padding: 20px 0;
`;

const CategoryListBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #232323;
  h3 {
    font-size: 20px;
    border-bottom: 1px solid #858585;
    padding: 0 10px 10px;
    margin: 0 10px 10px;
    pointer-events: none;
  }
`;
const DraggableInnerBox = styled.div<{isDragging :boolean;}>`
padding: 0px 15px 15px;
margin-bottom : 10px;
border-radius: 10px;
background: transparent;
${({isDragging, theme}) => isDragging && `
  background: #23232381;
`}
&:hover{
  ${MoveAttraction}{
    span{
      background: #454545;
    }
  }
}
`

const AddCategoryBtnBox =styled.div<{isNotItem : boolean}>`
${({isNotItem}) => isNotItem && `
border-top : 2px solid #999;
`}
  padding: 5px 0 0;
`