import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import customApi from '@utils/customApi';
import { useMutation, useQuery } from '@tanstack/react-query'
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import EditSubCategoryItems from './EditSubCategoryItems';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput from './EditCategoryInput';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import EditCategoryItemBox from './EditCategoryItemBox';
import { DefaultValue, useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';



const EditCategoryList = () => {
  /* const [currentData , setCurrentDate] = useRecoilState(currentCategoryData); */
  const [isMount, setIsMount] = useState(false);

  /* const addCategoryInput= ()=>{
    const filtered = currentData.filter(x=> x.categoryTitle === "");
    if(filtered.length >= 1){
      alert("빈 카테고리가 있습니다.")
      return
    }
    let addCategory= [...currentData, {categoryTitle:"",subCategories:[]}];
    setCurrentDate(addCategory)
  }
 */
  const [currentData , setCurrentDate] = useState<CategoryBackProps[]>([]);
  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);
  const test = currentData.map(({categoryTitle, subCategories})=>({categoryTitle,subCategories}))
  const defaultValues = {
    category: currentData
  }
  const methods = useForm({
    mode: 'all',
    defaultValues : useMemo(()=>{
      return {category: data}
    },[data])
  });
  console.log("{currentData}",currentData.map(({categoryTitle, subCategories})=>({categoryTitle,subCategories})))
  const { control, handleSubmit, reset } = methods;
  const { append, remove, fields } = useFieldArray({
    control,
    name: "category",
  });

  const onSubmit = (data: any) => {
    console.log({data})
  }

  useEffect(()=>{
    setIsMount(true)
  },[])


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
            <button type='submit'> 테스트 </button>
          </Form>
        </FormProvider>
          {/* {isMount &&
            currentData.map(({ categoryTitle,subCategories}: CategoryBackProps, idx:number) => (
              <EditCategoryItemBox
                idx={idx}
                categoryTitle={categoryTitle}
                subCategories={subCategories}
                ></EditCategoryItemBox>
            ))} */}
      </CategoryListBox>
    </CategoryNav>
  )
}

export default EditCategoryList

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

