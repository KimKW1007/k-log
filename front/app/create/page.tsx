import CreateEditPageInner from '@/src/app/createAndEdit/CreateEditPageInner';
import { Metadata, NextPage } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '글 쓰기 | K : Log',
  description: 'K:Log에 새로운 게시물을 만들어보세요!'
};
const CreatePage: NextPage = () => {
  return <CreateEditPageInner />;
};

export default CreatePage;
