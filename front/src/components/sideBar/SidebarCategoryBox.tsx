import React from 'react'
import styled from 'styled-components';
import CategoryItems from '@components/category/CategoryItems';
const SidebarCategoryBox = () => {
  return (
    <CategoryBox className='customScroll'>
      <CategoryItems/>
    </CategoryBox>
  )
}

export default SidebarCategoryBox

const CategoryBox = styled.div`
  width:100%;
  padding:  0 0 20px;
  min-height: 370px;
  dt{
    margin-bottom: 5px;
    a{
      font-size: 15px;
      padding: 10px 7px;

    }
  }
  dd{
    a{
      font-size: 14px;
      padding: 10px 30px;
      &:after{
        left: 14px;
        top: 16px;
      }
    }
  }
`