import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import type { NextPage } from 'next';

const CategoryPage: NextPage = () => {
  const [isMount, setIsMount] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    setIsMount(true)
  },[])
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