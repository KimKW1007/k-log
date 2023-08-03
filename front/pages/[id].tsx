import BoardDetail from '@components/board/BoardDetail'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { CategoryPageProps } from './category/[title]/[subTitle]'
import customApi from '@utils/customApi'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import withGetServerSideProps from '@utils/Seo/withGetServerSideProps'


const BoardPage : NextPage = ({id} : CategoryPageProps) => {
  return (
    <div>
      <BoardDetail id={id}/>
    </div>
  )
}
export const getServerSideProps : GetServerSideProps = withGetServerSideProps(async (context) => {
  const {query} = context;
  const {id} = query;
  const { getApi } = customApi(`/board/getBoard/${id}`);
  const data = await getApi();
  const {currentBoard} = data;
  return {
    props : { id, title : currentBoard.boardTitle }
  }
});

export default BoardPage
