'use client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import customApi from '@/src/utils/customApi';
import { useQuery } from '@tanstack/react-query';
import { GET_BOARDS } from '@/src/utils/queryKeys';
import BoardWrapComp from '@/src/components/board/BoardWrapComp';
import { useRecoilState } from 'recoil';
import { currentPagenation } from '@/src/atoms/atoms';
import useIsMount from '@/src/hooks/useIsMount';
import PageLoading from '@/src/components/common/Loading/PageLoading';
import { CategoryPageProps } from '@/app/category/[title]/[subTitle]/page';

const SubTitlePageInner = ({title, subTitle} : CategoryPageProps) => {
    const router = useRouter();
    const { isMount } = useIsMount();
    const [currentPage, setCurrentPage] = useRecoilState(currentPagenation);
    const { getApi } = customApi(`/board/subCategory/${subTitle.replaceAll('/', '-')}?page=${currentPage ?? 1}`);
    const { data, isLoading, refetch } = useQuery([GET_BOARDS, subTitle], () => getApi(), {
      enabled: !!Boolean(subTitle) && !!Boolean(title)
    });

    useEffect(() => {
      refetch();
    }, [currentPage, isMount]);

    useEffect(() => {
      setCurrentPage(1);
    }, [router]);
  return (
    <>
      <PageLoading isLoading={isLoading!} />
      <BoardWrapComp title={[title, subTitle]} isLoading={isLoading} currentList={data?.boards} lastPage={data?.last_page} />
    </>
  )
}

export default SubTitlePageInner