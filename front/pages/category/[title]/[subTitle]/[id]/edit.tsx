import React, { useEffect, useState } from 'react';
import useIsMount from 'src/hooks/useIsMount';
import { BoardTitleBox } from '@components/board/BoardWrapComp';
import { CreateContainer, CreateWrap } from '../create';
import { GetServerSideProps, NextPage } from 'next';
import { CategoryPageProps } from '..';
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps';
import customApi from '@utils/customApi';
import BoardForm from '@components/board/subTitlePage/BoardForm';

const BoardEditPage: NextPage = ({ categoryTitle, subTitle, id }: CategoryPageProps) => {
  const { isMount } = useIsMount();
  const [currentTitle, setCurrentTitle] = useState<string[]>([]);

  useEffect(() => {
    setCurrentTitle([categoryTitle, subTitle]);
  }, [isMount]);
  return (
    <CreateWrap>
      <CreateContainer>
        <BoardTitleBox>{isMount && currentTitle.map((ele, idx) => <p key={ele + 'salt' + idx}>{ele}</p>)}</BoardTitleBox>
        <BoardForm subTitle={subTitle} id={id} isEdit />
      </CreateContainer>
    </CreateWrap>
  );
};
export const getServerSideProps: GetServerSideProps = withGetServerSideProps(async (context) => {
  const { query } = context;
  const { title: categoryTitle, subTitle, id } = query;
  try {
    const { getApi } = customApi(`/board/getBoard/${id}`);
    const data = await getApi();
    const { currentBoard } = data;
    const checkSubTitleInData = currentBoard.subCategory.categorySubTitle === String(subTitle)?.replaceAll('-', '/');
    const checkTitleInData = currentBoard.subCategory.category.categoryTitle === String(categoryTitle)?.replaceAll('-', '/');
    if (!checkSubTitleInData || !checkTitleInData) {
      return {
        props: {},
        notFound: true
      };
    }
    return {
      props: { title: currentBoard.boardTitle, categoryTitle: String(categoryTitle)?.replaceAll('-', '/'), subTitle: String(subTitle)?.replaceAll('-', '/'), id }
    };
  } catch (e) {
    console.log({ e });
    return {
      props: {},
      notFound: true
    };
  }
});
export default BoardEditPage;
