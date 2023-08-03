import React from 'react'
import styled from 'styled-components';
import CategoryItems from '@components/category/CategoryItems';
const SidebarCategoryBox = ({isMenu} : {isMenu ?: boolean;}) => {
  return (
    <CategoryBox className='customScroll' isMenu={isMenu}>
      <CategoryItems/>
    </CategoryBox>
  )
}

export default SidebarCategoryBox

const CategoryBox = styled.div<{isMenu ?: boolean;}>`
  width:90%;
  padding:  0 0 20px;
  max-height: 500px;
  overflow-y:scroll;
  padding: 0 40px;
  margin: 0 auto;
  ${({isMenu}) => isMenu &&`
    width:100%;
    padding: 0;
    margin: 0;
  
  `}
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