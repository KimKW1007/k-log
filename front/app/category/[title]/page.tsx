import { notFound, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import type { Metadata, NextPage, ResolvingMetadata } from 'next';
import TitlePageInner from '../../../src/app/category/title/TitlePageInner';
import customApi from '@/src/utils/customApi';

export const generateMetadata = async ({ params: { title } }: { params: { title: string } }, parent: ResolvingMetadata): Promise<Metadata> => {
  const { getApi } = customApi('/category');
  const data = await getApi();
  const checkTitleInData = data.find((x: { categoryTitle: string }) => x.categoryTitle === String(title)?.replaceAll('-', '/'));
  if (!checkTitleInData) {
    notFound();
  }
  const decodeTitle = decodeURI(title).replaceAll('-', '/');
  return {
    title: decodeTitle + ' | K : Log',
    description: decodeTitle + '에 관한 게시물을 확인해 보세요!'
  };
};

const CategoryPage: NextPage = ({ params }: any) => {
  const { title } = params;
  const decodeTitle = decodeURI(title);

  return <TitlePageInner title={decodeTitle} />;
};

export default CategoryPage;
