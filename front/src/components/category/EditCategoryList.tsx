import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query'
import { GET_ALL_CATEGORY } from '@utils/queryKeys';
import { CategoryBackProps, SubCategoryBackProps } from './CategoryList';
import EditSubCategoryItems from './EditSubCategoryItems';
import AddCategoryBtn from './AddCategoryBtn';
import EditCategoryInput from './EditCategoryInput';


const EditCategoryList = () => {
  const [isClickAddBtn , setIsClickAddBtn] = useState(false);

  const { getApi } = customApi('/category');
  const { data, isLoading, isSuccess } = useQuery([GET_ALL_CATEGORY], getApi);

  return (
    <CategoryNav>
      <CategoryListBox>
        <h3>카테고리 목록</h3>
        {data &&
          data.map(({ categoryTitle, subCategories }: CategoryBackProps) => (
            <CategoryItemBox>
              <CategoryTitle>
                <EditCategoryInput defaultValue={categoryTitle} />
              </CategoryTitle>
              <EditSubCategoryItems subCategories={subCategories}></EditSubCategoryItems>
            </CategoryItemBox>
          ))}
          <AddCategoryBtn onClick={()=>{setIsClickAddBtn(true)}}></AddCategoryBtn>
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


const CategoryItemBox =styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
`



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

const CategoryTitle = styled.dt`
font-size: ${({ theme }) => theme.rem.p14};
margin-bottom: 2px;

`;

const CategoryItem = styled.dd`
position: relative;
margin-bottom: 2px;

`;