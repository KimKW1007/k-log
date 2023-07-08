import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import customApi from '@utils/customApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps } from './CategoryList';
import AddCategoryBtn from './AddCategoryBtn';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import EditCategoryItemBox from './EditCategoryItemBox';
import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';



const EditCategoryList = () => {
  const [isMount, setIsMount] = useState(false);

  // mutate - putApi 관련
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

  // getAPI 관련
  const { getApi } = customApi('/category');
  const { data, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);


  // useForm
  const methods = useForm({
    mode: 'all',
    defaultValues : useMemo(()=>{
      return {category: data}
    },[data])
  });

  const { control, handleSubmit, reset, watch, formState:{isDirty } } = methods;
  const { append, remove, fields } = useFieldArray({
    control,
    name: "category",
  });

  const onSubmit = (data: any) => {
    const result = data.category;
    const filteredCategory = result.filter((x :CategoryBackProps) => x.categoryTitle === '');
    const filteredSubCategory = result.map((x :CategoryBackProps) => x.subCategories.filter(v => v.categorySubTitle === '')).flat();
    if(filteredCategory.length >= 1 ){
      alert("상위 카테고리 중 비어있는 카테고리가 있습니다")
      return 
    }
    if(filteredSubCategory.length >= 1){
      alert("하위 카테고리 중 비어있는 카테고리가 있습니다")
      return 
    }
    mutate(result)
  }


  // 기본과 일치한지 아닌지
  useEffect(()=>{
      if (isDirty) {
        setIsChangeValue(true);
      } else {
        setIsChangeValue(false);
      }
  },[isDirty])

  // input에 변화가 일어나면 error false
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>{
      if(type === 'change') setIsError(false);
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(()=>{
    setIsMount(true)
  },[])

  // 기본값
  useEffect(()=>{
    reset({category : data})
  },[data])
  

  return (
    <CategoryNav>
      <CategoryListBox >
        <h3>카테고리 목록</h3>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((category, index)=>(
              <EditCategoryItemBox
                categoryIndex = {index}
                key={category.id}
                remove={remove}
              />
            ))}
            <AddCategoryBtn onClick={()=>{append({categoryTitle:"",subCategories:[]})}}></AddCategoryBtn>
                <EditBtnBox>
            <EditBtn disabled={!isChangeValue} isError={isError} isChangeValue={isChangeValue}>
              {isChangeValue ? "수정하기" : "수정완료"}
            </EditBtn>
          </EditBtnBox>
          </Form>
        </FormProvider>
      </CategoryListBox>
    </CategoryNav>
  )
}

export default EditCategoryList

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
const Form = styled.form`

`



const CategoryNav = styled.nav`
position: relative;
z-index : 3;
  width:100%;
margin-top: 2px;
padding: 20px 30px ;
`;



const CategoryListBox = styled.div`
display: flex;
flex-direction: column;
color: #232323;
h3 {
  font-size: ${({ theme }) => theme.rem.p14};
  border-bottom: 1px solid #858585;
  padding: 0 5px 8px;
  margin-bottom: 10px;
  pointer-events: none;
}
`;

