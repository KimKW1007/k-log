import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@utils/queryKeys';
import BoardWrapComp from '@components/board/BoardWrapComp';
import { useRecoilState } from 'recoil';
import { currentPagenation, isLoadingData } from '@atoms/atoms';
import useIsMount from 'src/hooks/useIsMount';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import PageLoading from '@components/common/Loading/PageLoading';

export interface CategoryPageProps{
  [key: string] : string
}

const SubCategoryPage: NextPage = ({title, subTitle} : CategoryPageProps) => {
  const router = useRouter();
  const {isMount} = useIsMount();
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const {getApi}  = customApi(`/board/subCategory/${subTitle.replaceAll("/","-")}?page=${currentPage ?? 1}`)
  const { data, isLoading, refetch } = useQuery([GET_BOARDS, subTitle] , ()=> getApi(), {
    enabled: !!Boolean(subTitle) && !!Boolean(title)
  });

  useEffect(()=>{
    refetch();
  },[currentPage,isMount])

  useEffect(()=>{
    setCurrentPage(1);
  },[router])

  return (
    <>
      <PageLoading isLoading={isLoading!}/>
      <BoardWrapComp title={[title , subTitle]} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page} />
    </>

  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  const {query} = context;
  const {title, subTitle} = query;
  return {
    props : {title : String(title)?.replaceAll("-","/") , subTitle : String(subTitle)?.replaceAll("-","/")}
  }
});
export default SubCategoryPage

