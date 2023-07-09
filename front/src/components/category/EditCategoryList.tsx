import React, { useEffect, useMemo, useState } from 'react';
import styled,{keyframes, css} from 'styled-components';
import customApi from '@utils/customApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import AddCategoryBtn from './AddCategoryBtn';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import EditCategoryItemBox from './EditCategoryItemBox';
import { OnlyJustifyCenterFlex } from '@components/common/CommonFlex';
import { removeTwoMoreEmptyBetweenString } from '@utils/removeTwoMoreEmptyBetweenString';



const EditCategoryList = () => {
  // mutate - putApi 관련
  const [isError, setIsError] = useState(false);
  const [isChangeValue, setIsChangeValue] = useState(false);
  const queryClient = useQueryClient();
  const {putApi} = customApi("category/updateCategories");
  const {mutate, isLoading} = useMutation(putApi,{
    onError(error : any) {
      setIsError(true);
      alert(error.response.data.message)
    },
    onSuccess(data) {
      console.log({data})
      setIsChangeValue(false)
    },
  })

  // getAPI 관련
  const { getApi } = customApi('/category');
  const { data } = useQuery([GET_ALL_CATEGORY], getApi);


  // useForm
  const methods = useForm({
    mode: 'all',
    defaultValues : useMemo(()=>{
      return {category: data}
    },[data])
  });

  const { control, handleSubmit, reset, watch, formState:{isDirty}  } = methods;
  const { append, remove, fields } = useFieldArray({
    control,
    name: "category",
  });

  const onSubmit = (data: any) => {
    if(isError) return;
    const categoryData = data.category;
    const filteredCategory = categoryData.filter((x :CategoryBackProps) => x.categoryTitle === '');
    const filteredSubCategory = categoryData.map((x :CategoryBackProps) => x.subCategories.filter(v => v.categorySubTitle === '')).flat();
    if(filteredCategory.length >= 1 ){
      alert("상위 카테고리 중 비어있는 카테고리가 있습니다")
      return 
    }
    if(filteredSubCategory.length >= 1){
      alert("하위 카테고리 중 비어있는 카테고리가 있습니다")
      return 
    }
    const copiedCategoryData = [...categoryData];
    const result = copiedCategoryData.map((cateTitle:CategoryBackProps)=>{
      cateTitle = { ...cateTitle, categoryTitle: removeTwoMoreEmptyBetweenString(cateTitle.categoryTitle) }
      const cateSubTitle = cateTitle.subCategories.map((cateSubTitle) =>{
        return {...cateSubTitle, categorySubTitle : removeTwoMoreEmptyBetweenString(cateSubTitle.categorySubTitle)}
      })
      cateTitle = {...cateTitle, subCategories : cateSubTitle}
      return cateTitle
    })
    mutate(result)
  }


  useEffect(()=>{
    if(isDirty){
      setIsChangeValue(true);
    }
  },[isDirty])
  
  // input에 변화가 일어나면 error false
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>{
      if(type === 'change'){
        setIsError(false);
        setIsChangeValue(true);
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])



  // 기본값
  useEffect(()=>{
    reset({category : data})
    queryClient.invalidateQueries([GET_ALL_CATEGORY]);
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
            <EditBtn  disabled={!isChangeValue} isError={isError} isChangeValue={isChangeValue}>
              {isLoading ? "수정 중" :isChangeValue ? "수정하기" : "수정완료"}
            </EditBtn>
          </EditBtnBox>
          </Form>
        </FormProvider>
      </CategoryListBox>
    </CategoryNav>
  )
}

export default EditCategoryList

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
`

const EditBtnBox = styled(OnlyJustifyCenterFlex)`
  width: 100%;
  margin-top: ${({ theme }) => theme.rem.p20};
`;
const EditBtn = styled.button<{ isChangeValue: boolean; isError:boolean; }>`
  width: 114px;
  padding: 10px 30px;
  border-radius: 6px;
  color: #fff;
  background: #454545;
  transition: .3s;

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
    isError && css`
    background: ${theme.color.err};
    animation : ${OnErrorShakeAni} .3s both;
    cursor: not-allowed;
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

