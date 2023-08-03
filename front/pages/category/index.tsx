import { currentPagenation } from '@atoms/atoms';
import BoardWrapComp from '@components/board/BoardWrapComp';
import { useQuery } from '@tanstack/react-query';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import customApi from '@utils/customApi';
import { BOARD_ALL, GET_BOARDS } from '@utils/queryKeys';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import useIsMount from 'src/hooks/useIsMount';

const AllCategoryPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const {isMount} = useIsMount();
  const {getApi} = customApi(`/board/getAllBoard/${currentPage ?? 1}`)
  const { data  , isLoading, refetch } = useQuery([GET_BOARDS, BOARD_ALL], () => getApi(),{
    enabled : !!isMount
  });
  useEffect(()=>{
    setCurrentPage(1);
  },[router])
  useEffect(()=>{
    refetch();
  },[currentPage, isMount])

  return (
    <BoardWrapComp title={['분류 전체보기']} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page}  />
  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  return {
    props : {}
  }
});
export default AllCategoryPage