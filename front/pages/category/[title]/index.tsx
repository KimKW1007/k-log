import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import type { NextPage } from 'next';
import useIsMount from 'src/hooks/useIsMount';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const {isMount} = useIsMount();
  return (
    <CategoryWrap>
      <TitleBox>
        <span>{isMount && router.query.title}</span>
      </TitleBox>

    </CategoryWrap>
  )
}

export default CategoryPage

const CategoryWrap = styled.div`
  width:100%;
  padding: 100px 50px;
`

const TitleBox = styled.div`
  text-align:center;
  font-size :30px;
  span{
    padding: 15px 30px;
    border-bottom: 2px solid ${({theme}) => theme.color.err};
  }
`