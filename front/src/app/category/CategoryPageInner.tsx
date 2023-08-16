"use client";

import React, { useEffect } from 'react';
import { currentPagenation } from '@/src/atoms/atoms';
import BoardWrapComp from '@/src/components/board/BoardWrapComp';
import PageLoading from '@/src/components/common/Loading/PageLoading';
import { useQuery } from '@tanstack/react-query';
import customApi from '@/src/utils/customApi';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import useIsMount from '@/src/hooks/useIsMount';
import { BOARD_ALL, GET_BOARDS } from '@/src/utils/queryKeys';


const CategoryPageInner
 = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const { isMount } = useIsMount();
  const { getApi } = customApi(`/board/getAllBoard/${currentPage ?? 1}`);
  const { data, isLoading, refetch } = useQuery([GET_BOARDS, BOARD_ALL], () => getApi(), {
    enabled: !!isMount
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [pathname]);
  useEffect(() => {
    refetch();
  }, [currentPage, isMount]);

  return (
    <>
      <PageLoading isLoading={isLoading!} />
      <BoardWrapComp title={['분류 전체보기']} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page} />
    </>
  );
}

export default CategoryPageInner
