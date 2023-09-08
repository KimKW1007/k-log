import customApi from '@/src/utils/customApi';
import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { CategoryPageProps } from '../../category/[title]/[subTitle]/page';
import CreateEditPageInner from '@/src/app/createAndEdit/CreateEditPageInner';

export const generateMetadata = async ({ params: { id } }: { params: CategoryPageProps }, parent: ResolvingMetadata): Promise<Metadata> => {
  try {
    const { getApi } = customApi(`/board/getBoard/${id}`);
    const data = await getApi();
    const { currentBoard } = data;
    const subTitle = currentBoard.subCategory.categorySubTitle;
    if (!currentBoard) {
      notFound();
    }
    return {
      title: subTitle + ' | K : Log',
      description: subTitle + '에 대한 게시물을 수정해보세요!'
    };
  } catch (e) {
    notFound();
  }
};

const EditPage: NextPage = ({ params }: any) => {
  const { id } = params;

  return <CreateEditPageInner id={id} isEdit />;
};

export default EditPage;
