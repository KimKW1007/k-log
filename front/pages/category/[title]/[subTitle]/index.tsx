import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@utils/queryKeys';
import BoardWrapComp from '@components/board/BoardWrapComp';

const SubCategoryPage: NextPage = () => {
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentSubTitle, setCurrentSubTitle] = useState('');
  const {getApi} = customApi(`/board/subCategory/${currentSubTitle}`)
  const { data : boardsList, isLoading } = useQuery([GET_BOARDS,currentSubTitle] , getApi, {
    enabled: !!Boolean(currentTitle)
  });
 
  useEffect(()=>{
    if(router.query){
      const title = router.query.title;
      const subTitle = router.query.subTitle;
      setCurrentTitle(title + '/' + subTitle)
      setCurrentSubTitle(String(subTitle))
    }
  },[router.query])

  return (
    <BoardWrapComp title={currentTitle} isLoading={isLoading} currentList={boardsList} />

  )
}

export default SubCategoryPage