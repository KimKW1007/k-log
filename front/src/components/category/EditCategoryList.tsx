import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query'
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import EditSubCategoryItems from './EditSubCategoryItems';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput from './EditCategoryInput';
import { useForm } from 'react-hook-form';
import EditCategoryItemBox from './EditCategoryItemBox';
import { useRecoilState } from 'recoil';
import { currentCategoryData } from '@atoms/atoms';

interface TestProps {
  id ?: number;
  categoryTitle : string;
  subCategories: SubCategoryBackProps[];
}

const EditCategoryList = () => {
  const [isClickAddBtn , setIsClickAddBtn] = useState(false);
  const [currentData , setCurrentDate] = useRecoilState(currentCategoryData);
  const [test, setTest] = useState<any[]>([{categoryTitle:"",subCategories:[]}]);
  const [isMount, setIsMount] = useState(false);
  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);


  const addCategoryInput= ()=>{
    const filtered = currentData.filter(x=> x.categoryTitle === "");
    if(filtered.length >= 1){
      alert("빈 카테고리가 있습니다.")
      return
    }
    let addCategory= [...currentData, {categoryTitle:"",subCategories:[]}];
    setCurrentDate(addCategory)
  }


  useEffect(()=>{
    if(data){
      setCurrentDate(data)
    }
  },[data])
  useEffect(()=>{
    setIsMount(true)
  },[])
  return (
    <CategoryNav>
      <CategoryListBox >
        <h3>카테고리 목록</h3>
          {isMount &&
            currentData?.map(({ categoryTitle,subCategories}: TestProps, idx:number) => (
              <EditCategoryItemBox
                idx={idx}
                categoryTitle={categoryTitle}
                subCategories={subCategories}
                ></EditCategoryItemBox>
            ))}
            <AddCategoryBtn onClick={()=>{addCategoryInput()}}></AddCategoryBtn>
      </CategoryListBox>
    </CategoryNav>
  )
}

export default EditCategoryList



const CategoryNav = styled.nav`
  width:100%;
margin-top: 2px;
overflow: hidden;
padding: 20px 30px ;
`;



const CategoryListBox = styled.dl`
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

