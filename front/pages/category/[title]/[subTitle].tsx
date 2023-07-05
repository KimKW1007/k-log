import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import type { NextPage } from 'next';

const SubCategoryPage: NextPage = () => {
  const [isMount, setIsMount] = useState(false);
  const router = useRouter();
  console.log(router)
  useEffect(()=>{
    setIsMount(true)
  },[])
  return (
    <div>{isMount && router.query.title + '/' + router.query.subTitle}</div>
  )
}

export default SubCategoryPage