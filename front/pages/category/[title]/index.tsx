import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@utils/queryKeys';
import BoardWrapComp from '@components/board/BoardWrapComp';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState('');
  const {getApi} = customApi(`/board/category/${currentTitle}`)
  const { data : boardsList,isLoading } = useQuery([GET_BOARDS, currentTitle], getApi, {
    enabled: !!Boolean(currentTitle)
  });
  useEffect(()=>{
    if(router.query.title){
      setCurrentTitle(String(router.query.title))
    }
  },[router.query.title])

  return (
    <BoardWrapComp title={currentTitle} isLoading={isLoading} currentList={boardsList} />
  )
}

export default CategoryPage
