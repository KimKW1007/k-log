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
      <TitleBox>{isMount && router.query.title}</TitleBox>

    </CategoryWrap>
  )
}

export default CategoryPage

const CategoryWrap = styled.div`
  width:100%;
  padding: 50px 50px;
`

const TitleBox = styled.div`

`