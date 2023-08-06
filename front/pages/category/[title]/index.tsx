import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next';
import customApi from '@utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@utils/queryKeys';
import BoardWrapComp from '@components/board/BoardWrapComp';
import useIsMount from 'src/hooks/useIsMount';
import { useRecoilState } from 'recoil';
import { currentPagenation, isLoadingData } from '@atoms/atoms';
import { CategoryPageProps } from './[subTitle]';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import PageLoading from '@components/common/Loading/PageLoading';

const CategoryPage: NextPage = ({title} : CategoryPageProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const {isMount} = useIsMount();
  const {getApi} = customApi(`/board/category/${title.replaceAll("/","-")}?page=${currentPage ?? 1}`)
  const { data ,isLoading, refetch } = useQuery([GET_BOARDS, title], () => getApi(), {
    enabled: !!Boolean(title) && isMount
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
      <BoardWrapComp title={[title]} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page} />
    </>
  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  const {query} = context;
  const {title} = query;
  return {
    props : {title : String(title)?.replaceAll("-","/")}
  }
});
export default CategoryPage
