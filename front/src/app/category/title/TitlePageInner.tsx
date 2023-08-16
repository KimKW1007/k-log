"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@/src/utils/queryKeys';
import BoardWrapComp from '@/src/components/board/BoardWrapComp';
import useIsMount from '@/src/hooks/useIsMount';
import { useRecoilState } from 'recoil';
import { currentPagenation } from '@/src/atoms/atoms';
import PageLoading from '@/src/components/common/Loading/PageLoading';

const TitlePageInner = ({title} : {title : string}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
  const { isMount } = useIsMount();
  const { getApi } = customApi(`/board/category/${title.split("/").join("-")}?page=${currentPage ?? 1}`);
  const { data, isLoading, refetch } = useQuery([GET_BOARDS, title], () => getApi().catch(e => router.push('/not-found')), {
    enabled: !!Boolean(title) && isMount
  });

  useEffect(() => {
    refetch();
  }, [currentPage, isMount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pathname]);
  return (
    <>
      <PageLoading isLoading={isLoading!} />
      <BoardWrapComp title={[title]} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page} />
    </>
  )
}

export default TitlePageInner